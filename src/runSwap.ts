import { MulticallSwap } from "./multicallSwap";
import { ethers } from "ethers";

async function main() {
  const privateKey: string = "private key";
  const rpcUrl: string = "base-rpc-url";
  const walletAddress: string = "wallet address";

  //   const UNISWAP_ROUTER_ADDRESS: string =
  //     "0xA324880f884036E3d21a09B90269E1aC57c7EC8a";
  //   const UNISWAP_FACTORY_ADDRESS: string =
  //     "0x7431A23897ecA6913D5c81666345D39F27d946A4";

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const signer = wallet.connect(provider);

  const params = [];
  //
  const param1 = {
    tokenIn: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb", // DAI
    tokenOut: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
    recipient: walletAddress,
    fee: 0,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    amountIn: BigInt(ethers.parseEther("0.0172")), // Corrected value
    amountOutMinimum: 0,
    slippageTolerance: 0.005,
    sqrtPriceLimitX96: BigInt(0),
  };

  const param2 = {
    tokenIn: "0x9de16c805a3227b9b92e39a446f9d56cf59fe640", // BENTO
    tokenOut: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
    recipient: walletAddress,
    fee: 0,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    amountIn: BigInt(ethers.parseEther("7")), // Corrected value
    amountOutMinimum: 0,
    slippageTolerance: 0.005,
    sqrtPriceLimitX96: BigInt(0),
  };

  params.push(param1, param2);

  console.log("Initializing swap...");

  const multicallSwap = new MulticallSwap(signer);

  await multicallSwap.performSwaps(params).catch(console.error);

  console.log("Swap process completed.");
}

main().catch((error) => {
  console.error("Error executing the swap:", error);
});
