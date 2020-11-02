let Web3 = require("web3");
const Tx = require('ethereumjs-tx')
const uniswapExchangeContractAbi = require('../abi/exchange.json');
let web3 = new Web3(
    new Web3.providers.HttpProvider(
      'https://ropsten.infura.io/v3/e16ecf41380f442987d31e736990fed2'
    )
  );

// the address that will send the test transaction
const transactionMaker = '0x1c4411c670Ef6c3B1009B5D13C3822b977b52ce1';
const transactionMakerPrivateKey = '7b686b07e74fb5669b45a3eedb03b7af7ca69763b2a1a941815d210f3e1b5729';

// the exchange contract address of ERC20 Token
const exchangeContractAddress_LakshmiKanthToken = '0x0da1e0d8ca4364f944bd98ac4d7760d574a12797'

//LakshmiKanthToken Contract Address
const lakshmiKanthTokenContractAddress = '0x832f1854532927A061790E8d1E432C66985ecA29';

const contract = new web3.eth.Contract(
  uniswapExchangeContractAbi,
  exchangeContractAddress_LakshmiKanthToken
);

//100 lakshmiKanth Tokens to be approved for spending by exchangeContractAddress_LakshmiKanthToken
const lakshmiKanthTokenQuantityForApproval = web3.utils.toHex(100*10**18) 
const tx = contract.methods.approve(exchangeContractAddress_LakshmiKanthToken, lakshmiKanthTokenQuantityForApproval);
const encodedABI = tx.encodeABI();

// Signs the given transaction data and sends it.
function sendSigned(txData, cb) {
  const privateKey = new Buffer(transactionMakerPrivateKey, 'hex')
  const transaction = new Tx(txData)
  transaction.sign(privateKey)
  const serializedTx = transaction.serialize().toString('hex')
  web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
}

// get the number of transactions sent so far so we can create a fresh nonce
web3.eth.getTransactionCount(transactionMaker).then(txCount => {

  // construct the transaction data
  const txData = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(6000000),
    gasPrice: web3.utils.toHex(10000000000), // 10 Gwei
    to: lakshmiKanthTokenContractAddress,
    from: transactionMaker,
    data: encodedABI,
  }

  sendSigned(txData, function(err, result) {
    if (err) return console.log('error', err)
    console.log('sent', result)
  })

})