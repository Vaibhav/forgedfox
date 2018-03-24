// Import libraries
const Web3 = require("web3");
 

//IPFS FILE RETRIEVAL EXAMPLE: https://ipfs.io/ipfs/QmXgZAUWd8yo4tvjBETqzUy3wLx5YRzuDwUQnBwRGrAmAo


process.env.ETHER_ACCOUNT_ADDRESS = "0xa3a9c8d8CA5787743C4928cDF26f6e965296C688";
process.env.ETHER_ACCOUNT_PASSWORD = "d8ba1dfb09d63711b63eda5683f6e2d71bfa4734173ad34bd1a7188babb4a258";
const rinkebyAccountAddress = process.env.ETHER_ACCOUNT_ADDRESS;
const rinkebyAccountPassword = process.env.ETHER_ACCOUNT_PASSWORD;
 
const EthereumTx = require('ethereumjs-tx')
const privateKey = Buffer.from(rinkebyAccountPassword, 'hex')
 
 
const path = require("path");
const BlackPaperJSON = require(path.join(__dirname, "../../../blockchain/build/contracts/BlackPaper.json"));
 
 
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
    privateKey: process.env.ETHER_ACCOUNT_PASSWORD,
    address: process.env.ETHER_ACCOUNT_ADDRESS,
});
 
//console.log(accountInfo);
process.env.CREATE_BLACKPAPER_GAS_COST = 2000000;
process.env.TRANSFER_SHARES_TO_GAS_COST = 1000000;
//const CREATE_BLACKPAPER_GAS_COST = 4001900; // TODO: CHANGE THIS TO ACCURATE VALUE
//const TRANSFER_SHARES_TO_GAS_COST = 2000000;
 
const CONTRACT_ADDRESS = '0x020535A975B670C355C9ED6d695a309Ed6615462';
 
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
 
/*
{
    "Creation": {
        "codeDepositCost": "725800",
        "executionCost": "infinite",
        "totalCost": "infinite"
    },
    "External": {
        "": "374",
        "destroy()": "30768",
        "getAllOwnerIds()": "infinite",
        "getOwnerCount()": "644",
        "getOwnerIds(uint256)": "806",
        "getOwnerStocks(bytes32)": "1023",
        "isOwner(bytes32)": "812",
        "issuedShares()": "408",
        "legalDocumentId()": "668",
        "organizer()": "522",
        "pin()": "562",
        "propertyId()": "602",
        "transferSharesTo(bytes32,bytes32,uint256)": "infinite",
        "transferSharesToBatch(bytes32,bytes32[],uint256[])": "infinite"
    }
}
*/
 
 
//TODO: SHould all be in a class that you instantiate.
 
//methodNames are:
const CONST_BLACKPAPER_METHODS = {
    pin: "pin",
    legalDocumentId: "legalDocumentId",
    propertyId: "propertyId",
    issuedShares: "issuedShares",
    isOwner: "isOwner",
    getOwnerCount: "getOwnerCount",
    getOwnerStocks: "getOwnerStocks",
    getOwnerIds: "getOwnerIds",
    getLegalDocumentString: "getLegalDocumentString",
    getPropertyIdString: "getPropertyIdString"
};
 
const NON_CONST_BLACKPAPER_METHODS = {
    transferSharesTo: "transferSharesTo",
    transferSharesToBatch: "transferSharesToBatch"
};
 
 
 
async function tester() {
 
    //////////////////////////////////////////////////////
    //const jsonResponsex = await getTransaction(TRANSACTION);
    //const jsonResponse0 = await getBalance();
    //  const jsonResponse00 = await testFund();
    // const jsonResponse000 = await newTestAccount();
    //const jsonResponse1 = await getGasPrice("transferSharesTo", CONTRACT_ADDRESS, [stringToBytes32("A"), stringToBytes32("B"), 123]);
 
    // BLACKPAPER TESTS
    // 'a2de11df72a433d63be12e581feb2e596497c533a24fb0b6babc446f830ab9c6'
    //const jsonResponseX = await publishContract("propertyId", "ownerid", "legaid", 123123, 10000);
 
    //yee();
    //getBalance();
    //callMethod();
 
 
 
    // const jsonResponse = await getPin(SAMPLE_TEST_BLACKPAPER_ADDRESS); //DIDNT WORK -> UNMARSHALLING OUTPUT?
     // const jsonResponse = await transferSharesTo(SAMPLE_TEST_BLACKPAPER_ADDRESS,  "1", "k", 600);
    // const jsonResponse = await getOwnerCount(SAMPLE_TEST_BLACKPAPER_ADDRESS); // =>  { error: "Error calling contract: abi: unmarshalling empty output." } }
    subscribeToBlackpaperEvents(CONTRACT_ADDRESS);
 
    //const legalDocumentId = await callMethod(CONST_BLACKPAPER_METHODS.getLegalDocumentString, CONTRACT_ADDRESS); // THIS WORKED AII WE GUCCIII!!!
   
    //const transferShares = await sendMethod(NON_CONST_BLACKPAPER_METHODS.transferSharesTo, CONTRACT_ADDRESS, 1000000, ["ownerid", "b", 500], true); // THIS WORKED AII WE GUCCIII!!!
   // const transferSharesBatchTest = await sendMethod(NON_CONST_BLACKPAPER_METHODS.transferSharesToBatch, CONTRACT_ADDRESS, 1000000, [stringToBytes32("boss"), [stringToBytes32("ownerid"), stringToBytes32("b")], [100, 100]], false);
   
 
   // const jsonResponse2 = await callMethod(CONST_BLACKPAPER_METHODS.pin, CONTRACT_ADDRESS);
   // const propertyId = await callMethod(CONST_BLACKPAPER_METHODS.getPropertyIdString, CONTRACT_ADDRESS);
   // const jsonResponse4 = await callMethod(CONST_BLACKPAPER_METHODS.issuedShares, CONTRACT_ADDRESS);
    //const jsonResponse5 = await callMethod(CONST_BLACKPAPER_METHODS.isOwner, CONTRACT_ADDRESS, ["owneridX"], true);
    //const jsonResponse6 = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerCount, CONTRACT_ADDRESS);
   // const owner1 = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerIds, CONTRACT_ADDRESS, [0]);
   // const jsonResponse8 = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerStocks, CONTRACT_ADDRESS, [owner1]);
   // const jsonResponse9 = await callMethod(CONST_BLACKPAPER_METHODS.isOwner, CONTRACT_ADDRESS, [owner1]);
    //const jsonResponse10 = await transferShares(CONTRACT_ADDRESS, "ownerid", "b", 1200);
   
    //TODO: make string conversions to bytes32 in an object recursive so it turns them all into bytes32!!!!!!!!
    const sharesOwnerId = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerStocks, CONTRACT_ADDRESS, ["ownerid"], true);
    const sharesOwnerb = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerStocks, CONTRACT_ADDRESS, ["b"], true);
    const sharesBoss = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerStocks, CONTRACT_ADDRESS, ["boss"], true);
 
    console.log("Shares ownerId " + sharesOwnerId);
    console.log("Shares b" + sharesOwnerb);
    console.log("Shares boss" + sharesBoss);
   
   //console.log("Transfer Shares Batch: " + JSON.stringify(transferSharesBatchTest));
    // const jsonResponse10 = await getOwnerIds(SAMPLE_TEST_BLACKPAPER_ADDRESS, 1);
    // const jsonResponse11 = await transferSharesTo(SAMPLE_TEST_BLACKPAPER_ADDRESS, "ownerid", "fook", 100); // => WORKSSS
    // const jsonResponse = await publishContract("propertyId", "ownerid", "legaid", 123123, 10000, 423145);
    // console.log(jsonResponse0);
    //  console.log(jsonResponse1);
    // console.log(jsonResponse00);
    // console.log(jsonResponse000);
    // console.log(jsonResponsex);
    // callMethod2();
    //    console.log(jsonResponseX);
    //   console.log(jsonResponse2);
   // console.log(legalDocumentId);
   //console.log(legalDocumentId2);
   // console.log(propertyId);
    //   console.log(jsonResponse4);
    //   console.log(jsonResponse5);
    //   console.log(jsonResponse6);
    //console.log(bytes32ToString(owner1));
    //   console.log(jsonResponse8);
    //    console.log(jsonResponse9); // 10000
    //console.log(jsonResponse10);
    // console.log(jsonResponse11);
}
 
/*
const transferShares = async (address, user1: string, user2: string, amount) => {
    //  const isUser1Owner = await callMethod(CONST_BLACKPAPER_METHODS.isOwner, CONTRACT_ADDRESS, [user1], true);
    const user1Ownership = await callMethod(CONST_BLACKPAPER_METHODS.getOwnerStocks, address, [user1], true);
    //DO other tricks like check if amount is less than issued shares and less than amount that user1 holds to reduce cost of sendMethod.
    //Basically make sendMethod work 100% of the time by rewriting in js
    if (user1Ownership > amount) {
        return await sendMethod(NON_CONST_BLACKPAPER_METHODS.transferSharesTo, address, process.env.TRANSFER_SHARES_TO_GAS_COST, [user1, user2, amount], true);
    } else {
        console.log("User 1 is not owner or does not have enuff stocks to fill trade.");
    }
};
*/
 
 
const getBalance = async (ether = false) => {
    const wei = await web3.eth.getBalance(process.env.ETHER_ACCOUNT_ADDRESS);
    if (ether) {
        return web3.utils.fromWei(wei, 'ether');
    } else {
        return wei;
    }
};
 
export const getGasPrice = async (methodName: string, address, params = []) => {
    const contract = new web3.eth.Contract(
        BlackPaperJSON["abi"]
    );
 
    contract.options.address = address;
 
    return await contract.methods[methodName](...params).estimateGas();
};
 
 
const contract = new web3.eth.Contract(
    BlackPaperJSON["abi"]
);
 
export const estimateGasForMethod = async (methodName: string, address, params = [], convertStringToBytes32 = false) => {
    const contract = new web3.eth.Contract(
        BlackPaperJSON["abi"]
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
        BlackPaperJSON["abi"]
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
 
 
        //.then(events => console.log(events)).catch(err => console.log(err));
    /*
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
*/
 
 
 
};
 
 
 
export const publishContract = async (
    _propertyId: String,
    _ownerId: String,
    _legalDocumentId: String,
    _pin: Number,
    _issuedShares) => {
 
        const contract = new web3.eth.Contract(
            BlackPaperJSON["abi"]
        );
 
    const contractToBeDeployed = contract.deploy({
        data: BlackPaperJSON["unlinked_binary"],
        arguments: [
            stringToBytes32(_propertyId),
            stringToBytes32(_ownerId),
            stringToBytes32(_legalDocumentId),
            stringToBytes32(_pin),
            _issuedShares]
    });
 
    // console.log(contractToBeDeployed);
    const gasLimit = await contractToBeDeployed.estimateGas();
 
    //if (gasLimit > process.env.CREATE_BLACKPAPER_GAS_COST) {
    //    return { "error": "GAS COST TOO HIGH PLEASE ADJUST IN PROCESS.ENV.FILE" }
    //  }
    const transactions = await web3.eth.getTransactionCount(process.env.ETHER_ACCOUNT_ADDRESS);
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = web3.utils.toHex(transactions);
    const gasPriceHex = web3.utils.toHex(gasPrice);
    const gasLimitHex = web3.utils.toHex(process.env.CREATE_BLACKPAPER_GAS_COST); //(user defined)  
 
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
 
//TODO FIX SEND METHOD:
export const sendMethod = async (methodName: string, address, gasLimit, params = [], convertStringToBytes32 = false) => {
    const contract = new web3.eth.Contract(
        BlackPaperJSON["abi"]
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
 
    const transactions = await web3.eth.getTransactionCount(process.env.ETHER_ACCOUNT_ADDRESS);
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
 
     //   return await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
/*
    const transactions = await web3.eth.getTransactionCount(process.env.ETHER_ACCOUNT_ADDRESS);
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = web3.utils.toHex(transactions);
    const gasPriceHex = web3.utils.toHex(gasPrice);
    const gasLimitHex = web3.utils.toHex(process.env.CREATE_BLACKPAPER_GAS_COST); //(user defined)  
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
*/
 
 
/*
    const signedTx = await web3.eth.accounts.signTransaction({
        chainId: 4,
        data: transactionData,
        gas: 300000
    }, process.env.ETHER_ACCOUNT_PASSWORD);
    ///await web3.eth.sendSignedTransaction(serializedTx2.rawTransaction)
    return await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
*/
};
 
export const callMethod = async (methodName: string, address, params = [], convertStringToBytes32 = false) => {
    const contract = new web3.eth.Contract(
        BlackPaperJSON["abi"]
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
 
 
 
 
/*
export const transferSharesTo = async (contractAddress: String, user1: String, user2: String, amount: Number) => {
    const contract = new web3.eth.Contract(
        BlackPaperJSON["abi"]
    );
    contract.options.address = CONTRACT_ADDRESS;
    return callContractMethod(contractAddress, "transferSharesTo", {
      "private": process.env.BLACKPAPER_PRIVATE_KEY,
      "gas_limit": TRANSFER_SHARES_TO_GAS_COST,
      "params": [user1, user2, amount],
    });
  };
*/
 
//tester();