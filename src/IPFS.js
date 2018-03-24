'use strict'

const series = require('async/series')
const IPFS = require('ipfs')
const fs = require("fs");
const path = require("path");

const node = new IPFS()

import { 
            fileHash
        } from "./FileHash";

import {
    publishFileContract,
    sendFileContractMethod,
    sendUserContractMethod,
} from "./Blockchain";


//For creating a new instance of a file
export async function createFile(UserAddress, data_blob, meta_data_json={"description": "yooo"}) {

    let newFileContract = await publishFileContract()
    console.log(newFileContract);
    let newFileContractAddress = newFileContract["address"];
    
    //updateFileToIPFS()
}


//For updating the file after its already created
export async function updateFileToIPFS(FileContractAddress, 
                                      data_blob,
                                      meta_data_json) {

    let hashed_file = fileHash(data_blob);
    let hashed_metadata = fileHash(meta_data_json);

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
};



export async function retrieveFileFromIPFS(){

}