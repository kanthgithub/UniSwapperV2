require('dotenv').config();
const IUniswapV2Router02Abi = require('../../abi/IUniswapV2Router02.json');
const TransactionHandler = require('../../utils/TransactionHandler');

const AddLiquidityToUniswapV2RouterContract = {
  addLiquidity: async (
    amountTokenDesired,
    amountTokenMin,
    amountETHMin
  ) => {
    const uniswapV2Router02Instance = TransactionHandler.loadContract(
      IUniswapV2Router02Abi.abi,
      process.env.uniswapV2RouterAddress
    );

    // function addLiquidityETH(
    //     address token,
    //     uint amountTokenDesired,
    //     uint amountTokenMin,
    //     uint amountETHMin,
    //     address to,
    //     uint deadline
    //   ) external payable returns (uint amountToken, uint amountETH, uint liquidity);

    const tx = uniswapV2Router02Instance.methods.addLiquidityETH(
      process.env.lakshmiKanthTokenContractAddress,
      amountTokenDesired,
      amountTokenMin,
      amountETHMin,
      process.env.transactionMaker,
      1598313600
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
      to: process.env.uniswapV2RouterAddress,
      from: process.env.transactionMaker,
      data: tx.encodeABI(),
    };

    return await TransactionHandler.signAndSendTransaction(
      txData,
      process.env.transactionMakerPrivateKey
    );
  },
};

module.exports = AddLiquidityToUniswapV2RouterContract;
