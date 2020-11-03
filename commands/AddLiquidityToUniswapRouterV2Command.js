const AddLiquidityToUniswapV2 = require('../scripts/personalTokenTousdc/AddLiquidityToUniswapV2');

const argv = require("minimist")(process.argv.slice(), {
  int: ["amountTokenDesired", "amountTokenMin", "amountETHMin"]
});

async function addLiquidity( amountTokenDesired,
  amountTokenMin,
  amountETHMin){
  return await AddLiquidityToUniswapV2.addLiquidity( amountTokenDesired,
    amountTokenMin,
    amountETHMin);
}

// Implement async callback to enable the script to be run by truffle or node.
async function Main(callback) {

try {
    // Pull the parameters from process arguments. Specifying them like this lets tests add its own.
    const result = await addLiquidity( argv.amountTokenDesired,
      argv.amountTokenMin,
      argv.amountETHMin);
    console.log(`completed adding-LiquidityETH of ${argv.amountETHMin} - with transactionHash: ${result}`);
  } catch (error) {
    console.error(error);
  }
  callback();
}

function nodeCallback(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else process.exit(0);
}

// If called directly by node, execute the Poll Function. This lets the script be run as a node process.
if (require.main === module) {
  Main(nodeCallback)
    .then(() => {})
    .catch(nodeCallback);
}

// Each function is then appended onto to the `Main` which is exported. This enables these function to be tested.
Main.addLiquidity = addLiquidity;
module.exports = Main;
