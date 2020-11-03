require('dotenv').config();
const erc20abi = require('../../abi/IERC20.json');
const TransactionHandler = require('../../utils/TransactionHandler');

const ApproveTokenSpendingForUniswapV2RouterContract = {
  approveTokenSpending: async (tokenQuantityForSpendingApproval) => {
   
    //100 lakshmiKanth Tokens to be approved for spending by uniswapV2RouterAddress
    const lakshmiKanthTokenQuantityForApproval = TransactionHandler.toHex(
      tokenQuantityForSpendingApproval * 10 ** 18
    );

    const contract = TransactionHandler.loadContract(
      erc20abi.abi,
      process.env.exchangeContractAddress_LakshmiKanthToken
    );

    const tx = contract.methods.approve(
      process.env.uniswapV2RouterAddress,
      lakshmiKanthTokenQuantityForApproval
    );

    const nonceNumber = await TransactionHandler.getNonce(
      process.env.transactionMaker
    );

    // get the number of transactions sent so far so we can create a fresh nonce
    // construct the transaction data
    const txData = {
      nonce: TransactionHandler.toHex(nonceNumber),
      gasLimit: TransactionHandler.toHex(6000000),
      gasPrice: TransactionHandler.toHex(10000000000), // 10 Gwei
      to: process.env.lakshmiKanthTokenContractAddress,
      from: process.env.transactionMaker,
      data: tx.encodeABI(),
    };

    return await TransactionHandler.signAndSendTransaction(
      txData,
      process.env.transactionMakerPrivateKey
    );
  },
};

module.exports = ApproveTokenSpendingForUniswapV2RouterContract;
