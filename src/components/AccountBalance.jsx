import {
  Wallet,
  Copy,
  RefreshCw,
  Network,
  Coins,
  PiggyBank,
} from "lucide-react";
import { useAccount, useBalance } from "wagmi";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useDragScroll from "../hooks/useDragScroll";

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

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { address, isConnected, connector } = useAccount();
  const { data, isError, isLoading, refetch } = useBalance({
    address,
    watch: true,
  });

  const {
    scrollContainerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useDragScroll();

  const getTransactionHistory = async (address) => {
    const apiKey = "7KPEXDEQ39XVBDJ89MX8PT1V3VMIHMWJCG";
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=0xA0Cf798816D4b9b9866b5330EEa46a18382f251e&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    if (data.status === "1") {
      return data.result;
    } else {
      throw new Error("Errore nel recuperare le transazioni");
    }
  };

  useEffect(() => {
    if (address) {
      const fetchTransactions = async () => {
        try {
          const txs = await getTransactionHistory(address);
          setTransactions(txs);
        } catch (err) {
          console.error(err);
        }
      };

      fetchTransactions();
    }
  }, [address]);

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

  // Varianti per animazioni
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const balanceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

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
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full bg-white bg-white/30 backdrop-blur-sm relative z-10 flex flex-col items-center justify-center rounded-3xl p-8 shadow-sm "
    >
      {/* Wallet Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {walletLogo && (
            <motion.div
              className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-primary"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={walletLogo}
                alt={`${walletName} Logo`}
                className="w-10 h-10 object-contain"
              />
            </motion.div>
          )}
          <div>
            <h2 className="text-xl font-bold text-gray-800">{walletName}</h2>
            
            <div className="flex items-center text-sm text-gray-600">
              <span className="text-sm text-gray-600">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
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
      <motion.div
        variants={balanceVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="w-full grid grid-cols-2 gap-4 bg-white/10 rounded-2xl p-4 backdrop-blur-sm"
      >
        <div className="flex items-center space-x-3">
          <Wallet className="w-6 h-6 text-dark" />
          <div>
            <span className="text-xs 2xl:text-base text-gray-500 block">
              Wallet Address
            </span>
            <span className="text-sm  2xl:text-base font-medium truncate max-w-[150px]">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Network className="w-6 h-6 text-dark" />
          <div>
            <span className="text-xs 2xl:text-base text-gray-500 block">
              Network
            </span>
            <span className="text-sm 2xl:text-base font-medium">Ethereum</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <PiggyBank className="w-6 h-6 text-dark" />
          <div>
            <span className="text-xs 2xl:text-base text-gray-500 block">
              Total Balance
            </span>
            <span className="text-lg 2xl:text-xl font-bold text-gray-800">
              {totalBalance}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Coins className="w-6 h-6 text-dark" />
          <div>
            <span className="text-xs 2xl:text-base text-gray-500 block">
              Available Balance
            </span>
            <span className="text-lg 2xl:text-xl font-bold text-gray-800">
              {availableBalance}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={balanceVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="w-full bg-white/10 rounded-2xl p-4 mt-6 backdrop-blur-sm"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Transactions
        </h3>

        <div
          ref={scrollContainerRef}
          className="overflow-x-hidden cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <table className="w-full text-sm text-dark">
            <thead className="text-xs text-dark uppercase bg-white/50">
              <tr>
                <th className="px-4 py-2 whitespace-nowrap">Hash</th>
                <th className="px-4 py-2 whitespace-nowrap">Valore</th>
                <th className="px-4 py-2 whitespace-nowrap">Data</th>
                <th className="px-4 py-2 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-dark">
                    Nessuna transazione trovata
                  </td>
                </tr>
              ) : (
                transactions.slice(0, 5).map((tx) => (
                  <tr
                    key={tx.hash}
                    className="bg-white/20 border-b border-white/60"
                  >
                    <td className="px-4 py-2 truncate">
                      <a
                        href={`https://etherscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs 2xl:text-base"
                      >
                        {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                      </a>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs 2xl:text-base">
                      {(tx.value / 1e18).toFixed(4)} ETH
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs 2xl:text-base">
                      {new Date(tx.timeStamp * 1000).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`text-xs 2xl:text-base font-semibold ${
                          tx.isError === "0" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {tx.isError === "0" ? "Successo" : "Fallito"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
