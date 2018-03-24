'use strict'

const series = require('async/series')
let IPFS = require('ipfs')
const fs = require("fs");
const path = require("path");
const bluebird = require("bluebird");




IPFS = bluebird.promisifyAll(IPFS)



import {
    fileHash
} from "./FileHash";

import {
    publishFileContract,
    sendFileContractMethod,
    sendUserContractMethod,
    NON_CONST_FILE_CONTRACT_METHODS,
    NON_CONST_USER_CONTRACT_METHODS,
    NON_CONST_USER_CONTRACT_METHODS_COSTS,
    NON_CONST_FILE_CONTRACT_METHOD_COSTS,
} from "./Blockchain";


//For creating a new instance of a file

/*
{ blockHash: '0xda82fc15d147d3b1a6c3614f2adf42f575f7ebb29ecd82f509e24276e6e2518e',
  blockNumber: 1989867,
  contractAddress: '0x7940ee7f99578Be16e7b265e6068B375CE1BE183',
  cumulativeGasUsed: 3210699,
  from: '0xa3a9c8d8ca5787743c4928cdf26f6e965296c688',
  gasUsed: 350417,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: '0x1',
  to: null,
  transactionHash: '0xb49aafcb35012f79e49f2fd99722d93c7f802dc85c843983643a1c61750f8bc3',
  transactionIndex: 13 }



*/

const USER_ADDRESS = '0x8FDfccE1d7Ff2F00D86c68B7a0e50A074FB76b26';

let data_blob = fs.readFileSync("./MedicalNote.pdf");
//console.log("DATA BLOB IS:" + data_blob)
let meta = {
    "description": "yooo"
};

export async function createFile(UserAddress, data_blob, meta_data_json) {

  //  let newFileContract = await publishFileContract()
 //   console.log(newFileContract);
    let newFileContractAddress = "0x8D3B24e2F0433C56c2155BFfa5d2d34033FED1f7" //newFileContract["contractAddress"];
    

    console.log("NEW FILE CONTRACT ADDRESS IS " + newFileContractAddress);
 //   await sendUserContractMethod(
//        NON_CONST_USER_CONTRACT_METHODS.addFileContract,
 //       USER_ADDRESS,
   //     NON_CONST_USER_CONTRACT_METHODS_COSTS.addFileContract, 
  //      [newFileContractAddress])

   let result = await updateFileToIPFS(newFileContractAddress, 
                                       data_blob, 
                                       meta_data_json);

 //  return result;

}







//For updating the file after its already created
export async function updateFileToIPFS(FileContractAddress,
    data_blob,
    meta_data_json) {



    
    let hashed_file = fileHash(data_blob);
    let hashed_metadata = fileHash(meta_data_json);
    let ipfsHash = ""

    console.log("hashed_file " + hashed_file);
    console.log("hashed_metadata" + hashed_metadata);
    
    try {

        const node = new IPFS()

        let result = await node.onAsync("ready");
        let nodeVersion = await node.version()

        console.log("NODE VERSION IS " + JSON.stringify(nodeVersion));
        let fileToStore = data_blob;


        let filesAdded = await node.files.addAsync({
                path: '',
                content: fileToStore
            });

        console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash)
        ipfsHash = filesAdded[0].hash
    } catch (error) {
        console.log(error);
    }

    /*
        await series([
            (cb) => node.on('ready', cb),
            (cb) => node.version((err, version) => {
                if (err) {
                    return cb(err)
                }
                console.log('Version:', version.version)
                cb()
            }),
            (cb) => {
                let fileToStore = data_blob;


                node.files.add({
                    path: '',
                    content: fileToStore
                }, (err, filesAdded) => {
                    if (err) {
                        return cb(err)
                    }

                    console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash)
                    fileMultihash = filesAdded[0].hash
                    cb()
                })

            },
            (cb) => {

                node.files.cat(fileMultihash, (err, data) => {
                    if (err) {
                        return cb(err)
                    }

                    console.log('\nFile content:')
                    fs.writeFileSync("fook.pdf", data);
                    process.stdout.write(data)
                })
            }
        ])
        */ 
    
    console.log("IPFS HASH IS " + ipfsHash);
    console.log("hashed FILE IS: " + hashed_file)
    console.log("meta data is " + hashed_metadata);
    let fileResult = {};
  //  let fileResult = await sendFileContractMethod(NON_CONST_FILE_CONTRACT_METHODS.updateFile,
  //      FileContractAddress,
  //      NON_CONST_FILE_CONTRACT_METHOD_COSTS.updateFile, [ipfsHash, hashed_file, hashed_metadata])




    return {
        "block_hash": fileResult["blockHash"],
        "block_number": fileResult["blockNumber"],
        "transaction_hash": fileResult["transactionHash"],
        "hash": hashed_file,
        "metadata_hash": hashed_metadata,
        "ipfs_path": ipfsHash,
        "added_at": Date.now(),
    }
};






export async function retrieveFileFromIPFS() {

}


createFile(USER_ADDRESS,
    "asdasd",
    meta);