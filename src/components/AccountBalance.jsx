import { useAccount, useBalance, useConnect } from "wagmi";
import { Copy, RefreshCw, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import MetamaskLogo from "../assets/images/metamask.png";

export default function AccountBalance() {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const { address, isConnected } = useAccount();

  // Ottieni il saldo del wallet connesso (di default su Ethereum mainnet)
  const { data, isError, isLoading } = useBalance({
    address, // Usa l'indirizzo del wallet connesso
    watch: true, // Rileva i cambiamenti in tempo reale
  });

  // Stato per il nome del wallet
  const [walletName, setWalletName] = useState("");
  const { connectors, connect } = useConnect(); // Hook per i connettori disponibili

  // Funzione per ottenere il nome del wallet
  const getWalletName = () => {
    // Trova il connettore attivo in base all'indirizzo
    const activeConnector = connectors.find((c) => c.ready);
    return activeConnector ? activeConnector.name : "Unknown Wallet";
  };

  // Imposta il nome del wallet quando il wallet è connesso
  useEffect(() => {
    if (isConnected) {
      const name = getWalletName();
      setWalletName(name);
    }
  }, [isConnected, connectors]); // Ricalcola quando cambia lo stato del wallet o dei connettori


  // Gestisci la situazione se il wallet non è connesso o se c'è un errore
  if (!isConnected) {
    return (
      <div className="w-full bg-white relative z-10 flex flex-col items-start justify-center rounded-3xl bg-white/30 p-6 shadow-sm backdrop-blur-sm border border-white/20">
        <h1 className="text-2xl font-bold mb-2">Your Balance</h1>
        <p>Please connect your wallet to view the balance.</p>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading balance...</p>;
  }

  if (isError) {
    return <p>Error fetching balance.</p>;
  }

  const totalBalance = data?.formatted; // Saldo totale in formato leggibile
  const availableBalance = totalBalance; // In un contesto reale, il saldo disponibile potrebbe differire

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="w-full bg-white relative z-10 flex flex-col items-center justify-center rounded-3xl bg-white/30 p-6 shadow-sm backdrop-blur-sm border border-white/20">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          {walletName === "MetaMask" && (
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-primary">
              <img
                src={MetamaskLogo}
                alt="MetaMask Logo"
                className="w-8 h-8 "
              />
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-black">{walletName}</h2>
            <p className="text-xs text-black flex items-center">
              {address.slice(0, 6)}...{address.slice(-4)}
              <button
                onClick={copyAddressToClipboard}
                className="ml-2 bg-white/10 hover:bg-white/20 rounded-full p-1 transition"
              >
                <Copy className="w-4 h-4 text-black" />
              </button>
              {copiedAddress && (
                <span className="text-black ml-2 text-xs">Copied!</span>
              )}
            </p>
          </div>
        </div>
        <button className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition">
          <RefreshCw className="w-5 h-5 text-black" />
        </button>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 bg-white/20 rounded-2xl p-4">
        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500 mb-1">Wallet Address</span>
          <div className="flex items-center">
            <span className="text-sm font-medium truncate max-w-[150px]">
              {address}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500 mb-1">Network</span>
          <span className="text-sm font-medium">Ethereum</span>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500 mb-1">Total Balance</span>
          <span className="text-lg font-bold text-dark">${totalBalance}</span>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-xs text-gray-500 mb-1">Available Balance</span>
          <span className="text-lg font-bold text-dark">
            ${availableBalance}
          </span>
        </div>
      </div>

      <button className="w-full mt-4 p-3 bg-black text-white rounded-3xl transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95">
        Claim all rewards
      </button>
    </div>
  );
}
