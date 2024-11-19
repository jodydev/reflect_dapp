import {
  Wallet,
  Copy,
  RefreshCw,
  Network,
  Coins,
  PiggyBank,
} from "lucide-react";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { useState, useEffect, useCallback } from "react";

import NoWalletConnected from "./wallet/NoWalletConnected";
import LoadingWallet from "./wallet/LoadingWallet";
import ErrorWallet from "./wallet/ErrorWallet";

import MetamaskLogo from "../assets/images/metamask.png";
import CoinbaseLogo from "../assets/images/coinbase.png";
import TrustWalletLogo from "../assets/images/trust-wallet.png";
import WalletConnect from "../assets/images/wallet-connect.png";
import SafeLogo from "../assets/images/safe.png";
import InjectedLogo from "../assets/images/injected.png";

export default function AccountBalance() {
  const [walletName, setWalletName] = useState("");
  const [walletLogo, setWalletLogo] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [refreshBalance, setRefreshBalance] = useState(false);

  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading, refetch } = useBalance({
    address,
    watch: true,
  });

  // Imposta il nome del wallet e il logo quando il wallet è connesso
  useEffect(() => {
    if (isConnected && connector) {
      const name = connector.name;
      setWalletName(name);

      switch (name) {
        case "MetaMask":
          setWalletLogo(MetamaskLogo);
          break;
        case "Coinbase Wallet":
          setWalletLogo(CoinbaseLogo);
          break;
        case "Trust Wallet":
          setWalletLogo(TrustWalletLogo);
          break;
        case "Injected":
          setWalletLogo(InjectedLogo);
          break;
        case "WalletConnect":
          setWalletLogo(WalletConnect);
          break;
        case "Safe":
          setWalletLogo(SafeLogo);
          break;
        default:
          setWalletLogo(InjectedLogo);
      }
    }
  }, [isConnected, connector]);

  // Funzione per copiare l'indirizzo negli appunti
  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // Funzione di refresh per ricaricare i dati
  const handleRefresh = useCallback(() => {
    console.log("Refreshing balance...");
    setRefreshBalance(true);
    refetch();
    setTimeout(() => setRefreshBalance(false), 2000);
  }, [refetch]);

  // Not Connected State
  if (!isConnected) {
    return <NoWalletConnected />;
  }

  // Loading State
  if (isLoading || refreshBalance) {
    return <LoadingWallet />;
  }

  // Error State
  if (isError) {
    return <ErrorWallet />;
  }

  // Connected State
  const totalBalance = data?.formatted || "0.00";
  const availableBalance = totalBalance;

  return (
    <div className="w-full bg-white bg-white/30 backdrop-blur-sm relative z-10 flex flex-col items-center justify-center rounded-3xl  p-8 shadow-sm ">
      {/* Wallet Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {walletLogo && (
            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-primary">
              <img
                src={walletLogo}
                alt={`${walletName} Logo`}
                className="w-10 h-10 object-contain"
              />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-gray-800">{walletName}</h2>
            <div className="flex items-center text-sm text-gray-600">
              {address.slice(0, 6)}...{address.slice(-4)}
              <button
                onClick={copyAddressToClipboard}
                className="ml-2 bg-white bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-1 transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
              >
                <Copy className="w-4 h-4" />
              </button>
              {copiedAddress && (
                <span className="text-dark ml-2 text-xs">Copied!</span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="bg-white bg-white/30 backdrop-blur-sm hover:bg-white/50 p-2 rounded-full transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
        >
          <RefreshCw className="w-5 h-5 text-dark" />
        </button>
      </div>

      {/* Wallet Details Grid */}
      <div className="w-full grid grid-cols-2 gap-4 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <Wallet className="w-6 h-6 text-dark" />
          <div>
            <span className="text-xs text-gray-500 block">Wallet Address</span>
            <span className="text-sm font-medium truncate max-w-[150px]">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Network className="w-6 h-6 text-dark" />
          <div>
            <span className="text-xs text-gray-500 block">Network</span>
            <span className="text-sm font-medium">Ethereum</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <PiggyBank className="w-6 h-6 text-dark" />
          <div>
            <span className="text-xs text-gray-500 block">Total Balance</span>
            <span className="text-lg font-bold text-gray-800">
              {totalBalance}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Coins className="w-6 h-6 text-dark" />
          <div>
            <span className="text-xs text-gray-500 block">
              Available Balance
            </span>
            <span className="text-lg font-bold text-gray-800">
              {availableBalance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
