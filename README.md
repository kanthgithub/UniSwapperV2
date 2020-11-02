# Swap ERC20 on Uniswap-V2

## Background:

- Uniswap V2 is an upgrade on V1

- Uniswap V2 provides ERC20 to ERC20 token swaps, where ETH is no longer required
  to be an intermediary token to facilitate the swap process.

- This was also known as “ETH bridging”.
  Removing this requirement cuts the transaction count in half and saves on gas fees.

- This also allows Dapps to effectively find “routes” from one token to another
   in the event that there is not a pool set up for a direct token swap.
 

## Usecase-1 - DAI to USDC Swap with Router:

 - Step-1: Approve spending on DAI Token wallet for UniSwap-V2 Router

 - Step-2: Swap DAI Token for another ERC20 Token [Done via UniSwap-Router]

 [DAI to USDC Swap with Router](./images/v2_swaps.png)

## Usecase-2 - Personal Token to USDC Swap with Router:

 - Step-1: Approve spending on Personal Token from wallet

 - Step-2: Create a pair on Uniswap-V2 (Add Liquidity will automatically create a Pair)

 - Step-3: Swap Personal Token for another ERC20 Token [Done via UniSwap-Router]


