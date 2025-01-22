## AssetScooper MulticallSwap SDK powered by Uniswap V3

The `AssetScooper MulticallSwap SDK` simplifies token swaps across multiple pools using [Uniswap V3's](https://blog.uniswap.org/uniswap-v3) advanced functionality. With support for multicall transactions, token approvals, and slippage control, this SDK enables efficient and customizable token swaps for developers.

### Features

- Multicall Transactions: Batch multiple swaps into a single transaction for efficiency.
- Slippage Management: Define slippage tolerance for precise token swaps.
- Dynamic Pool Fee Discovery: Automatically identify the best pool fee tier for swaps.
- Approval Management: Automatically handle token approvals when needed.
- Liquidity Check: Ensure pools have sufficient liquidity before performing swaps.

### Installation

```bash
npm install assetscooper-multicallswap-sdk
# or
yarn add assetscooper-multicallswap-sdk
```

### Usage

#### Here's how to get started with the SDK:

###### Import and Initialize

```typescript
import { ethers } from "ethers";
import { MulticallSwap } from "assetscooper-multicallswap-sdk";

// Setup signer, router, and factory addresses
const provider = new ethers.JsonRpcProvider("<RPC_URL>");
const signer = provider.getSigner("<YOUR_WALLET_ADDRESS>");
const routerAddress = "<UNISWAP_ROUTER_ADDRESS>";
const factoryAddress = "<UNISWAP_FACTORY_ADDRESS>";

// Initialize the MulticallSwap class
const multicallSwap = new MulticallSwap(signer, routerAddress, factoryAddress);
```

###### Perform Token Swaps

To perform multiple token swaps, provide an array of SwapParam objects:

```typescript
const swapParams = [
  {
    tokenIn: "<TOKEN_IN_ADDRESS>",
    tokenOut: "<TOKEN_OUT_ADDRESS>",
    amountIn: ethers.parseUnits("1", 18), // 1 token (adjust decimals)
    amountOutMinimum: ethers.parseUnits("0.95", 18), // Adjust for slippage
    deadline: Math.floor(Date.now() / 1000) + 60 * 10, // 10-minute deadline
    slippageTolerance: 0.01, // 1% slippage
  },
  {
    tokenIn: "<ANOTHER_TOKEN_IN_ADDRESS>",
    tokenOut: "<ANOTHER_TOKEN_OUT_ADDRESS>",
    amountIn: ethers.parseUnits("2", 6), // Adjust for decimals
    amountOutMinimum: ethers.parseUnits("1.9", 6), // Adjust for slippage
    deadline: Math.floor(Date.now() / 1000) + 60 * 10, // 10-minute deadline
    slippageTolerance: 0.01, // 1% slippage
  },
];

// Perform the swaps
await multicallSwap.performSwaps(swapParams);
```

###### Error Handling

The SDK provides robust error handling for common issues:

- Insufficient Balance: Checks if the wallet has enough tokens for the swap.
- Expired Deadlines: Ensures the transaction deadline is valid.
- Liquidity Issues: Verifies if the target pool has sufficient liquidity.

#### performSwaps

```typescript
async performSwaps(params: SwapParam[]): Promise<void>
```

`params: An array of SwapParam objects containing swap details.`

- SwapParam Fields:

-`tokenIn:` Address of the input token. -`tokenOut:` Address of the output token. -`amountIn:` Amount of input tokens.

- `amountOutMinimum:` Minimum acceptable amount of output tokens. -`deadline:` UNIX timestamp for transaction expiry. -`slippageTolerance:` Percentage of slippage allowed.

### Key Methods

```typescript
  performSwaps(params: SwapParam[])
```

Executes multiple swaps via a single transaction. Ensures the following:

- Deadlines are valid.
- The user has sufficient token balances.
- Approvals are granted for required amounts.
- Pools exist and have sufficient liquidity.
- Slippage is calculated and applied.

```typescript
  needsApproval(amountIn: bigint, tokenIn: string)
```

Checks if token approval is needed for the specified amount.

```typescript
  approveToken(amountIn: bigint, tokenIn: string)
```

Approves the token for the Uniswap Router.

```typescript
  getPoolFee(tokenIn: string, tokenOut: string)
```

Determines the appropriate fee tier for the swap (e.g., 0.05%, 0.3%, or 1%).

```typescript
  poolExistsWithLiquidity(tokenIn: string, tokenOut: string, fee: number)
```

Verifies if a liquidity pool exists and has sufficient liquidity.

## Example Usage with the SDK

```typescript
import { MulticallSwap } from "multicall-swap-sdk";
import { ethers } from "ethers";

async function main() {
  //your RPC URL with your API KEY - you can make use of base for example
  const provider = new ethers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/YOUR_INFURA_KEY"
  );
  const signer = provider.getSigner(YOUR_WALLET_ADDRESS);

  const multicallSwap = new MulticallSwap(signer);

  const params = [
    {
      tokenIn: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb", // DAI
      tokenOut: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
      recipient: YOUR_WALLET_ADDRESS,
      fee: 3000,
      deadline: Math.floor(Date.now() / 1000) + 60 * 20,
      amountIn: BigInt("1000000000000000000"),
      amountOutMinimum: BigInt("0"),
      slippageTolerance: 0.01,
    },
  ];

  await multicallSwap.performSwaps(params);
}

main();
```

### Contributing

We welcome contributions to improve this SDK! To contribute, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature-name).
- Commit your changes (git commit -m 'Add feature').
- Push the branch (git push origin feature-name).
- Create a pull request and wait for a review.
