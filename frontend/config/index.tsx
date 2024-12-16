import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, base, sepolia, liskSepolia } from '@reown/appkit/networks'
import { createPublicClient } from 'viem'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

//   const liskSepolia = {
//     id: 4202,
//     name: 'Lisk Sepolia Testnet',
//     network: 'lisk-testnet',
//     nativeCurrency: {
//       name: 'Lisk',
//       symbol: 'LSK',
//       decimals: 18,
//     },
//     rpcUrls: {
//       default: {
//         http: ['https://rpc.sepolia-api.lisk.com/'],
//       },
//       public: {
//         http: ['https://rpc.sepolia-api.lisk.com/'],
//       },
//     },
//     blockExplorers: {
//       default: { name: 'Lisk Explorer', url: 'https://sepolia-blockscout.lisk.com/' },
//     },
//     testnet: true,
//   };

export const networks = [mainnet, arbitrum, base, sepolia, liskSepolia]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks,
})

export const config = wagmiAdapter.wagmiConfig