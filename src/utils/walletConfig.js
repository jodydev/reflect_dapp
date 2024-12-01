import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors'

const projectId = 'fde918906f07d028cf4030337eef1681';

export const walletConfig = createConfig({
  chains: [mainnet, base],
  connectors: [
    metaMask(),
    coinbaseWallet(),
    walletConnect({ projectId }),
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})