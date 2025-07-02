import { ethers } from "ethers"

// Supported crypto currencies
export const SUPPORTED_CRYPTO = {
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    chainId: 1,
    rpcUrl:
      process.env.NEXT_PUBLIC_ETH_RPC_URL ||
      "https://eth-mainnet.g.alchemy.com/v2/your-api-key",
  },
  BTC: {
    symbol: "BTC",
    name: "Bitcoin",
    decimals: 8,
  },
  USDT: {
    symbol: "USDT",
    name: "Tether",
    decimals: 6,
    contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7", // Ethereum mainnet
    chainId: 1,
  },
} as const

// Platform wallet addresses
export const PLATFORM_WALLETS = {
  ETH: process.env.NEXT_PUBLIC_ETH_WALLET_ADDRESS!,
  BTC: process.env.NEXT_PUBLIC_BTC_WALLET_ADDRESS!,
  USDT: process.env.NEXT_PUBLIC_USDT_WALLET_ADDRESS!,
}

// Check if Web3 wallet is available
export function isWeb3Available() {
  return typeof window !== "undefined" && typeof window.ethereum !== "undefined"
}

// Connect to Web3 wallet
export async function connectWeb3Wallet() {
  if (!isWeb3Available()) {
    throw new Error(
      "No Web3 wallet detected. Please install MetaMask or another Web3 wallet."
    )
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    return accounts[0]
  } catch (error) {
    console.error("Failed to connect wallet:", error)
    throw error
  }
}

// Get current network
export async function getCurrentNetwork() {
  if (!isWeb3Available()) {
    throw new Error("No Web3 wallet detected")
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const network = await provider.getNetwork()
  return network.chainId
}

// Switch to specific network
export async function switchNetwork(chainId: number) {
  if (!isWeb3Available()) {
    throw new Error("No Web3 wallet detected")
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    })
  } catch (error: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (error.code === 4902) {
      throw new Error("Please add this network to your wallet")
    }
    throw error
  }
}

// Send ETH transaction
export async function sendETHTransaction(
  toAddress: string,
  amount: string,
  metadata: {
    donationId: string
    projectId: string
    projectTitle: string
  }
) {
  if (!isWeb3Available()) {
    throw new Error("No Web3 wallet detected")
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    // Convert amount to wei
    const amountInWei = ethers.parseEther(amount)

    // Create transaction
    const tx = await signer.sendTransaction({
      to: toAddress,
      value: amountInWei,
      data: ethers.toUtf8Bytes(JSON.stringify(metadata)),
    })

    // Wait for transaction confirmation
    const receipt = await tx.wait()

    return {
      hash: receipt!.hash,
      from: receipt!.from,
      to: receipt!.to,
      value: amountInWei.toString(),
      status: receipt!.status === 1 ? "success" : "failed",
    }
  } catch (error) {
    console.error("ETH transaction failed:", error)
    throw error
  }
}

// Send ERC20 token transaction
export async function sendERC20Transaction(
  tokenAddress: string,
  toAddress: string,
  amount: string,
  decimals: number,
  metadata: {
    donationId: string
    projectId: string
    projectTitle: string
  }
) {
  if (!isWeb3Available()) {
    throw new Error("No Web3 wallet detected")
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    // ERC20 ABI for transfer function
    const erc20Abi = [
      "function transfer(address to, uint256 amount) returns (bool)",
      "function balanceOf(address owner) view returns (uint256)",
    ]

    // Create contract instance
    const contract = new ethers.Contract(tokenAddress, erc20Abi, signer)

    // Convert amount to token units
    const amountInUnits = ethers.parseUnits(amount, decimals)

    // Check balance
    const balance = await contract.balanceOf(await signer.getAddress())
    if (balance < amountInUnits) {
      throw new Error("Insufficient token balance")
    }

    // Send transaction
    const tx = await contract.transfer(toAddress, amountInUnits)
    const receipt = await tx.wait()

    return {
      hash: receipt.hash,
      from: receipt.from,
      to: toAddress,
      value: amountInUnits.toString(),
      status: receipt.status === 1 ? "success" : "failed",
    }
  } catch (error) {
    console.error("ERC20 transaction failed:", error)
    throw error
  }
}

// Generate QR code for crypto payment
export function generateCryptoQRData(
  currency: string,
  address: string,
  amount: string
): string {
  switch (currency) {
    case "BTC":
      return `bitcoin:${address}?amount=${amount}`
    case "ETH":
      return `ethereum:${address}?value=${ethers.parseEther(amount).toString()}`
    default:
      return address
  }
}

// Monitor transaction status
export async function monitorTransaction(
  txHash: string,
  chainId: number = 1
): Promise<ethers.TransactionReceipt | null> {
  const provider = new ethers.JsonRpcProvider(SUPPORTED_CRYPTO.ETH.rpcUrl)

  try {
    const receipt = await provider.getTransactionReceipt(txHash)
    return receipt
  } catch (error) {
    console.error("Failed to get transaction receipt:", error)
    return null
  }
}
