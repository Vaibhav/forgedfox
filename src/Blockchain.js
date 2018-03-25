// Import libraries


const Web3 = require("web3");



//IPFS FILE RETRIEVAL EXAMPLE: https://ipfs.io/ipfs/QmXgZAUWd8yo4tvjBETqzUy3wLx5YRzuDwUQnBwRGrAmAo


//TODO: HASH IT FROM THE BLOCKCHAIN.


const ETHER_ACCOUNT_ADDRESS = "0xa3a9c8d8CA5787743C4928cDF26f6e965296C688";
const ETHER_ACCOUNT_PASSWORD = "d8ba1dfb09d63711b63eda5683f6e2d71bfa4734173ad34bd1a7188babb4a258";
const CREATE_USER_GAS_COST = 4001900;
const CREATE_FILE_CONTRACT_COST = 4001900;

const rinkebyAccountAddress = "0xa3a9c8d8CA5787743C4928cDF26f6e965296C688"; //ETHER_ACCOUNT_ADDRESS;
const rinkebyAccountPassword = "d8ba1dfb09d63711b63eda5683f6e2d71bfa4734173ad34bd1a7188babb4a258"; //ETHER_ACCOUNT_PASSWORD;

const EthereumTx = require('ethereumjs-tx')
const privateKey = Buffer.from(rinkebyAccountPassword, 'hex')


const path = require("path");
const FileContractJSON = require("../build/contracts/FileContract.json");
const UserJSON = require("../build/contracts/User.json");

// Setup RPC connection
const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/ccr3cGB0LqgS5Om1vtBW");



//const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
/*
web3.eth.getBlock("latest", (error, result) => {
    console.log("error:", error);
    console.log("results", result);
  });
*/
web3.eth.accounts;

const accountInfo = web3.eth.accounts.wallet.add({
    privateKey: rinkebyAccountPassword, //ETHER_ACCOUNT_PASSWORD,
    address: rinkebyAccountAddress, //ETHER_ACCOUNT_ADDRESS,
});

//const CREATE_BLACKPAPER_GAS_COST = 4001900; // TODO: CHANGE THIS TO ACCURATE VALUE
//const TRANSFER_SHARES_TO_GAS_COST = 2000000;

const USER_ADDRESS = '0x8FDfccE1d7Ff2F00D86c68B7a0e50A074FB76b26';
const FILE_ADDRESS = '0x2171dA6A81bF377C791E55777794b59B5E2ee1d2';


//TODO: SHould all be in a class that you instantiate.

//methodNames are:
export const CONST_FILE_CONTRACT_METHODS = {
    verifyFile: "verifyFile",
    getAdmin: "getAdmin",
    getFiles: "getFiles",
    getFile: "getFile"
};

export const NON_CONST_FILE_CONTRACT_METHODS = {
    updateFile: "updateFile",
};

export const CONST_USER_CONTRACAT_METHODS = {
    getUser: "getUser",
    getFile: "getFile",
    getContractAmount: "getContractAmount"
};

export const NON_CONST_USER_CONTRACT_METHODS = {
    addFileContract: "addFileContract",
    vet: "vet",
};


export const NON_CONST_FILE_CONTRACT_METHOD_COSTS = {
    updateFile: 4001900,
}

export const NON_CONST_USER_CONTRACT_METHODS_COSTS = {
    addFileContract: 4001900,
}

async function updateFile(ipfsFilePath, hash, metadataHash, fileContractAddress) {
    return sendFileContractMethod(
        NON_CONST_FILE_CONTRACT_METHODS.updateFile,
        fileContractAddress,
        NON_CONST_FILE_CONTRACT_METHOD_COSTS.updateFile, [
            stringToBytes32(ipfsFilePath),
            stringToBytes32(hash),
            stringToBytes32(metadataHash),
        ]
    )
}




/*
export function stringToBytes32(str) {
    return web3.utils.fromAscii(str);
}
export function bytes32ToString(bytes32) {
    return web3.utils.toAscii(bytes32);
}
*/
//Compare and contrast Utf8 versionj to ascii version
export function stringToBytes32(str) {
    return web3.utils.fromUtf8(str);
}

export function bytes32ToString(bytes32) {
    return web3.utils.toUtf8(bytes32);
}


async function tester() {

    //////////////////////////////////////////////////////
    //const jsonResponsex = await getTransaction(TRANSACTION);
    //const jsonResponse0 = await getBalance();
    //  const jsonResponse00 = await testFund();
    // const jsonResponse000 = await newTestAccount();
    //const jsonResponse1 = await getGasPrice("transferSharesTo", CONTRACT_ADDRESS, [stringToBytes32("A"), stringToBytes32("B"), 123]);

    // BLACKPAPER TESTS
    // 'a2de11df72a433d63be12e581feb2e596497c533a24fb0b6babc446f830ab9c6'
    const jsonResponseX = await publishFileContract();
   // const jsonResponseXI = await publishUserContract("Paul", "Iozzo", "paul@hotmail.com");

    //yee();
    //getBalance();
    //callMethod();


 //   const addFileToFileContract = await sendFileContractMethod(NON_CONST_FILE_CONTRACT_METHODS.addFile, 
  //                                                             FILE_ADDRESS, 
  //                                                             1000000, 
   //                                                            ["ownerid", "b", 500], 
    //                                                          true); // THIS WORKED AII WE GUCCIII!!!
     
    
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

        console.log(getUser);
  

   //  const jsonResponse8 = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerStocks, CONTRACT_ADDRESS, [owner1]);
    // const jsonResponse9 = await callMethod(CONST_BLACKPAPER_METHODS.isOwner, CONTRACT_ADDRESS, [owner1]);
    //const jsonResponse10 = await transferShares(CONTRACT_ADDRESS, "ownerid", "b", 1200);

    //TODO: make string conversions to bytes32 in an object recursive so it turns them all into bytes32!!!!!!!!
    //const sharesOwnerId = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerStocks, CONTRACT_ADDRESS, ["ownerid"], true);
    //const sharesOwnerb = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerStocks, CONTRACT_ADDRESS, ["b"], true);
    //const sharesBoss = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerStocks, CONTRACT_ADDRESS, ["boss"], true);

    //console.log("Shares ownerId " + sharesOwnerId);
    //console.log("Shares b" + sharesOwnerb);
    //console.log("Shares boss" + sharesBoss);
}

/*
const transferShares = async (address, user1: string, user2: string, amount) => {
    //  const isUser1Owner = await callMethod(CONST_BLACKPAPER_METHODS.isOwner, CONTRACT_ADDRESS, [user1], true);
    const user1Ownership = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerStocks, address, [user1], true);
    //DO other tricks like check if amount is less than issued shares and less than amount that user1 holds to reduce cost of sendMethod.
    //Basically make sendMethod work 100% of the time by rewriting in js
    if (user1Ownership > amount) {
        return await sendMethod(NON_CONST_BLACKPAPER_METHODS.transferSharesTo, address, TRANSFER_SHARES_TO_GAS_COST, [user1, user2, amount], true);
    } else {
        console.log("User 1 is not owner or does not have enuff stocks to fill trade.");
    }
};
*/

//export const addSecureFile(fileBlob,)

const getBalance = async (ether = false) => {
    const wei = await web3.eth.getBalance(ETHER_ACCOUNT_ADDRESS);
    if (ether) {
        return web3.utils.fromWei(wei, 'ether');
    } else {
        return wei;
    }
};

export const getGasPrice = async (methodName, address, params = []) => {
    const contract = new web3.eth.Contract(
        FileContractJSON["abi"]
    );

    contract.options.address = address;

    return await contract.methods[methodName](...params).estimateGas();
};


const contract = new web3.eth.Contract(
    FileContractJSON["abi"]
);

export const estimateGasForMethod = async (methodName: string, address, params = [], convertStringToBytes32 = false) => {
    const contract = new web3.eth.Contract(
        FileContractJSON["abi"]
    );

    contract.options.address = address;
    let transactionData;

    const methodParams = []
    if (convertStringToBytes32) {
        params.map(item => {
            if (typeof item === 'string' || item instanceof String)
                methodParams.push(stringToBytes32(item));
            else
                methodParams.push(item);
        });

        transactionData = contract.methods[methodName](...methodParams).estimateGas();
    } else {
        return await contract.methods[methodName](...params).estimateGas();
    }
};


export const subscribeToBlackpaperEvents = async (address) => {
    /*
    myContract.events.MyEvent({
        filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0
    }, function(error, event){ console.log(event); })
    .on('data', function(event){
        console.log(event); // same results as the optional callback above
    })
    .on('changed', function(event){
        // remove event from local database
    })
    .on('error', console.error);
    */

    /*
    events.allEvents
myContract.events.allEvents([options][, callback])
Same as events but receives all events from this smart contract.
Optionally the filter property can filter those events.
   
    */


    const contract = new web3.eth.Contract(
        FileContractJSON["abi"]
    );

    contract.options.address = address;

    contract.events.TransactionInvoked().
    on('data', function (event) {
            console.log(event); // same results as the optional callback above
        })
        .on('changed', function (event) {
            // remove event from local database
        })
        .on('error', console.error);

    //.then(events => console.log(events)).catch(err => console.log(err));

    contract.events.UserDidNotExist()
        .on('data', function (event) {
            console.log(event); // same results as the optional callback above
        })
        .on('changed', function (event) {
            // remove event from local database
        })
        .on('error', console.error);


    contract.events.FailedOrganizerAuthentication()
        .on('data', function (event) {
            console.log(event); // same results as the optional callback above
        })
        .on('changed', function (event) {
            // remove event from local database
        })
        .on('error', console.error);

    contract.events.NotEnoughShares()
        .on('data', function (event) {
            console.log(event); // same results as the optional callback above
        })
        .on('changed', function (event) {
            // remove event from local database
        })
        .on('error', console.error);



};




export const sendContractMethod = async (abi, methodName,
    address, gasLimit, params = [],
    convertStringToBytes32 = false) => {
    const contract = new web3.eth.Contract(
        abi
    );

    contract.options.address = address;
    let transactionData;
    let estimatedGasCost;

    const methodParams = [];
    if (convertStringToBytes32) {
        params.map(item => {
            if (typeof item === 'string' || item instanceof String)
                methodParams.push(stringToBytes32(item));
            else
                methodParams.push(item);
        });
        //     console.log("METHOD PARAMS IS " + methodParams.toString());
        transactionData = contract.methods[methodName](...methodParams).encodeABI();
        estimatedGasCost = await contract.methods[methodName](...methodParams).estimateGas();
    } else {
        transactionData = contract.methods[methodName](...params).encodeABI();
        estimatedGasCost = await contract.methods[methodName](...params).estimateGas();
    }

    //  console.log(transactionData);
    console.log("ESTIMATED GAS COST FOR TRADE IS : " + estimatedGasCost);

    const transactions = await web3.eth.getTransactionCount(ETHER_ACCOUNT_ADDRESS);
    const gasPrice = await web3.eth.getGasPrice();

    const nonce = web3.utils.toHex(transactions);
    const gasPriceHex = web3.utils.toHex(gasPrice);
    const gasLimitHex = web3.utils.toHex(gasLimit); //(user defined)  
    const txParams = {
        nonce: nonce,
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex,
        to: address,
        data: transactionData,
    };

    const tx = new EthereumTx(txParams);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();

    return await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        // .once('transactionHash', function (hash) { return hash; })
        // .once('receipt', function (receipt) { console.log("Receipt is" + receipt) })
        // .once('confirmation', function (confNumber, receipt) { console.log("COnfirmation and reciept is: " + confNumber + " AND RECEIPT: " + JSON.stringify(receipt)); })
        //  .once('error', function (error) { console.log("ERROR IS " + error); })
        .then(function (receipt) {
            // will be fired once the receipt its mined
            console.log("SEND THEN");
            console.log(receipt);
            return receipt;
        }).catch(err => {
            console.log("CATCH");
            console.log(err);
            return err;
        });
};

export const callContractMethod = async (abi, methodName: string, address, params = [], convertStringToBytes32 = false) => {
    const contract = new web3.eth.Contract(
        abi,
    );

    contract.options.address = address;

    const methodParams = []
    if (convertStringToBytes32) {
        params.map(item => {
            if (typeof item === 'string' || item instanceof String)
                methodParams.push(stringToBytes32(item));
            else
                methodParams.push(item);
        });

        return await contract.methods[methodName](...methodParams).call();
    } else {
        return await contract.methods[methodName](...params).call();
    }
};





export const publishFileContract = async () => {

    const contract = new web3.eth.Contract(
        FileContractJSON["abi"]
    );

    const contractToBeDeployed = contract.deploy({
        data: FileContractJSON["unlinked_binary"],
        arguments: []
    });

    // console.log(contractToBeDeployed);
    const gasLimit = await contractToBeDeployed.estimateGas();

    //if (gasLimit > CREATE_BLACKPAPER_GAS_COST) {
    //    return { "error": "GAS COST TOO HIGH PLEASE ADJUST IN FILE" }
    //  }
    const transactions = await web3.eth.getTransactionCount(ETHER_ACCOUNT_ADDRESS);
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = web3.utils.toHex(transactions);
    const gasPriceHex = web3.utils.toHex(gasPrice);
    const gasLimitHex = web3.utils.toHex(CREATE_FILE_CONTRACT_COST); //(user defined)  

    const txParams = {
        nonce: nonce,
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex,
        //to: '0x0000000000000000000000000000000000000000',
        //value: '0x00',
        data: contractToBeDeployed.encodeABI() //contractToBeDeployed["_deployData"]
    };

    const tx = new EthereumTx(txParams);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();

    return await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', console.log).then(function (receipt) {
            // will be fired once the receipt its mined
            console.log(receipt);
            return receipt;
        }).catch(err => {
            console.log(err)
            return err;
        });
};

export const publishUserContract = async (_firstName, _lastName, _email) => {

    const contract = new web3.eth.Contract(
        UserJSON["abi"]
    );

    const contractToBeDeployed = contract.deploy({
        data: UserJSON["unlinked_binary"],
        arguments: [stringToBytes32(_firstName), 
                    stringToBytes32(_lastName), 
                    stringToBytes32(_email)]
    });

    // console.log(contractToBeDeployed);
    const gasLimit = await contractToBeDeployed.estimateGas();

    //if (gasLimit > CREATE_BLACKPAPER_GAS_COST) {
    //    return { "error": "GAS COST TOO HIGH PLEASE ADJUST IN FILE" }
    //  }
    const transactions = await web3.eth.getTransactionCount(ETHER_ACCOUNT_ADDRESS);
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = web3.utils.toHex(transactions);
    const gasPriceHex = web3.utils.toHex(gasPrice);
    const gasLimitHex = web3.utils.toHex(CREATE_USER_GAS_COST); //(user defined)  

    const txParams = {
        nonce: nonce,
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex,
        //to: '0x0000000000000000000000000000000000000000',
        //value: '0x00',
        data: contractToBeDeployed.encodeABI() //contractToBeDeployed["_deployData"]
    };

    const tx = new EthereumTx(txParams);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();

    return await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', console.log).then(function (receipt) {
            // will be fired once the receipt its mined
            console.log(receipt);
            return receipt;
        }).catch(err => {
            console.log(err)
            return err;
        });
};



export const sendFileContractMethod = async (methodName,
    address,
    gasLimit,
    params = [],
    convertStringToBytes32 = false) => {
        console.log(FileContractJSON["abi"]);
    return sendContractMethod(FileContractJSON["abi"],
                              methodName, 
                              address, 
                              gasLimit, 
                              params, 
                              convertStringToBytes32);
}

export const callFileContractMethod = async (abi, methodName,
    address, gasLimit, params = [],
    convertStringToBytes32 = false) => {
    return callContractMethod(FileContractJSON["abi"], methodName, address, params, convertStringToBytes32);
}

export const sendUserContractMethod = async (methodName,
    address,
    gasLimit,
    params = [],
    convertStringToBytes32 = false) => {
    return sendContractMethod(UserJSON["abi"], 
                              methodName, 
                              address, 
                              gasLimit, 
                              params, 
                              convertStringToBytes32);
}

export const callUserContractMethod = async (methodName,
    address, gasLimit, params = [],
    convertStringToBytes32 = false) => {
    return callContractMethod(UserJSON["abi"], methodName, address, params, convertStringToBytes32)
}


//tester();