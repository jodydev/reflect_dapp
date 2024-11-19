import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

// Importa WalletConnect tramite import
import WalletConnectProvider from '@walletconnect/client';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';

function WalletConnect() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    const modal = new Web3Modal({
      cacheProvider: true, // Salva l'ultima connessione
      providerOptions: {
        injected: {
          display: {
            name: 'MetaMask',
            description: 'Connect with MetaMask',
          },
          package: null,
        },
        walletconnect: {
          display: {
            name: 'WalletConnect',
            description: 'Scan with WalletConnect',
          },
          package: WalletConnectProvider, // Usa WalletConnect come provider
          options: {
            rpc: {
              1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Ethereum Mainnet RPC URL
            },
          },
        },
        coinbasewallet: {
          display: {
            name: 'Coinbase Wallet',
            description: 'Connect with Coinbase Wallet',
          },
          package: CoinbaseWalletSDK, // Usa Coinbase Wallet SDK
          options: {
            appName: "React Dapp",
          },
        },
      },
    });

    const instance = await modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(instance);
    setProvider(web3Provider);

    const accounts = await web3Provider.listAccounts();
    const balance = await web3Provider.getBalance(accounts[0]);

    setAccount(accounts[0]);
    setBalance(ethers.utils.formatEther(balance)); // Formatta il bilancio in ETH
  };

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
          <p>Balance: {balance} ETH</p>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;
