'use strict'

const series = require('async/series')
let IPFS = require('ipfs')
const fs = require("fs");
const path = require("path");
const bluebird = require("bluebird");


import {
    fileHash
} from "./FileHash";

import {
    publishFileContract,
    sendFileContractMethod,
    sendUserContractMethod,
    CONST_USER_CONTRACAT_METHODS,
    NON_CONST_FILE_CONTRACT_METHODS,
    NON_CONST_USER_CONTRACT_METHODS,
    NON_CONST_USER_CONTRACT_METHODS_COSTS,
    NON_CONST_FILE_CONTRACT_METHOD_COSTS,
    CONST_FILE_CONTRACT_METHODS,
    stringToBytes32,
    bytes32ToString,
    callFileContractMethod,
    callUserContractMethod,
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

//let data_blob = fs.readFileSync("./MedicalNote.pdf");
//console.log("DATA BLOB IS:" + data_blob)
let meta = {
    "description": "yooo"
};

export async function createFile(UserAddress, data_blob, meta_data_json) {
    console.log("YOU INPUTTED USER ADRESS: " + USER_ADDRESS);
    let newFileContract = await publishFileContract()
    console.log(newFileContract);
    let newFileContractAddress = newFileContract["contractAddress"];
    

  //  console.log("NEW FILE CONTRACT ADDRESS IS " + newFileContractAddress);
    
 //   await sendUserContractMethod(
  //      NON_CONST_USER_CONTRACT_METHODS.addFileContract,
  //      USER_ADDRESS,
  //      NON_CONST_USER_CONTRACT_METHODS_COSTS.addFileContract, 
   //     [newFileContractAddress])
    

   let result = await updateFileToIPFS(newFileContractAddress, 
                                       data_blob, 
                                       meta_data_json);

   return result;
}


//TODO: SHOULD HASHING BE DONE ON THE SMART CONTRACT OR IN THE JS.

export async function getUser(USER_ADDRESS) {
    const getUser = await callUserContractMethod(CONST_USER_CONTRACAT_METHODS.getUser, 
        USER_ADDRESS, 
        1000000, 
        [], 
        false);

        console.log(getUser["0"])
        console.log(getUser["1"])
        console.log(bytes32ToString(getUser["2"]))  // Firstname
        console.log(bytes32ToString(getUser["3"]))  // Lastname
        console.log(bytes32ToString(getUser["4"])) //  Email
        
        
        
        const a =  {
            "Owner": getUser["0"],
            "vetted": getUser["1"],
            "FirstName": bytes32ToString(getUser["2"]),
            "LastName": bytes32ToString(getUser["3"]),
            "Email": bytes32ToString(getUser["4"]),
        };
        console.log(a);
        return a;
}



//For updating the file after its already created
export async function updateFileToIPFS(FileContractAddress,
    data_blob,
    meta_data_json) {

       // const node = new IPFS();

    
    let hashed_file = fileHash(data_blob);
    let hashed_metadata = fileHash(meta_data_json);
    let ipfsHash = ""

    console.log("hashed_file " + hashed_file);
    console.log("hashed_metadata" + hashed_metadata);


/*    
    series([
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
                    ipfsHash = filesAdded[0].hash
                    cb()
                })

            },
            (cb) => {

                node.files.cat(ipfsHash, (err, data) => {
                    if (err) {
                        return cb(err)
                    }

                    console.log('\nFile content:')
                   // fs.writeFileSync("fook.pdf", data);
                    process.stdout.write(data)
                })
            }
        ])
        
    */
    console.log("IPFS HASH IS " + ipfsHash);
    console.log("hashed FILE IS: " + hashed_file)
    console.log("meta data is " + hashed_metadata);
        ipfsHash = "QmXgZAUWd8yo4tvjBETqzUy3wLx5YRzuDwUQnBwRGrAmAo"
    let fileResult = await sendFileContractMethod(
        "updateFile",
        FileContractAddress,
        NON_CONST_FILE_CONTRACT_METHOD_COSTS.updateFile,
        [  "kkjhkjhkj", //TODO: Chnage IPFSHash to string 
            hashed_file, 
            hashed_metadata], true)
    console.log("RESULT IS");
    
    const r = {
        "block_hash": fileResult["blockHash"],
        "block_number": fileResult["blockNumber"],
        "transaction_hash": fileResult["transactionHash"],
        "contractAddress": FileContractAddress,
        "hash": hashed_file,
        "metadata_hash": hashed_metadata,
        "ipfs_path": "kkjhkjhkj",
        "added_at": Date.now(),
    }

    console.log(r);
    return r;
}

export async function verifyHash(FileContractAddress, test_file_blob) {
    let hashed_test_file_blob = fileHash(test_file_blob);
    let result = 
        await callFileContractMethod(CONST_FILE_CONTRACT_METHODS.getFile, 
                                     FileContractAddress, 
                                     500000, 
                                     [hashed_test_file_blob], true)
    console.log(result);
    const a = {
        "found": (result['0']),
        "creator": (result['1']),
        "fileHash": bytes32ToString(result['2']),
        "ipfsPath": bytes32ToString(result['3']),
        "metadataHash": bytes32ToString(result['4']),
        "addedAt": (result['5'])
    };

    console.log(a);
    return a;
 
}


export async function retrieveFileFromIPFS() {

}




//createFile(USER_ADDRESS, "asdasd", meta);


//verifyHash('0xc32d12537A939B93D7B5Bc86Eb5EBE3501eaCE66', "asdasq")

verifyHash('0xc32d12537A939B93D7B5Bc86Eb5EBE3501eaCE66', "asdasd")
getUser(USER_ADDRESS);




    /*
    MY ATTEMPT AT BETTER IPFS CODE

        try {

        const node = new IPFS()

        let result = await node.onAsync("ready");
        let nodeVersion = await node.versionAsync()

        console.log("NODE VERSION IS " + JSON.stringify(nodeVersion));
        let fileToStore = data_blob;
   

        node.files.add({
            path: '',
            content: fileToStore
        }, (err, filesAdded) => {
            if (err) {
                return cb(err)
            }

            console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash)
            let fileMultihash = filesAdded[0].hash
        })

//   node.files.add({
 //              path: 'fook',
  //              content: fileToStore
 ///           });
 
    //    console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash)
     //   ipfsHash = filesAdded[0].hash
    } catch (error) {
        console.log(error);
    }

    
    
    
    */