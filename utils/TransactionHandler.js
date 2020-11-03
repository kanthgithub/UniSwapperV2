let Web3 = require('web3');
const Tx = require('ethereumjs-tx');
require('dotenv').config();
let web3 = new Web3(new Web3.providers.HttpProvider(process.env.infura));

const TransactionHandler = {
  signAndSendTransaction: async (txData, privateKeyString) => {
    const transaction = new Tx(txData);
    const privateKey =  Buffer.from(privateKeyString, 'hex');
    transaction.sign(privateKey);
    const serializedTx = '0x' + transaction.serialize().toString('hex');
    const result = await new Promise(async (resolve) => {
      await web3.eth
        .sendSignedTransaction(serializedTx)
        .once('transactionHash', (hash) => {
          resolve(hash);
        });
    });
    return result;
  },

  loadContract: (contractAbi, contractAddress) => {
    return new web3.eth.Contract(contractAbi, contractAddress);
  },

  getWeb3FromInfura: () => {
    return web3;
  },

  toHex : (value) => {
    return web3.utils.toHex(value);
  },

  fromWei: (value) => {
    return web3.utils.fromWei(value, 'Ether');
  },

  getNonce : async (address) => {
    return await web3.eth.getTransactionCount(address);
  },
};

module.exports = TransactionHandler;
