import { useState, useEffect } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { useAccount, useBalance } from "wagmi";
import { ethers } from "ethers";
import WalletOptions from "./wallet/WalletOptions";
import axios from "axios";

export default function StakeForm() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [priceDetails, setPriceDetails] = useState({
    price: null,
    minReceived: null,
    priceImpact: null,
  });

  const { address, isConnected } = useAccount();
  const { data } = useBalance({
    address,
    watch: true,
  });

  const totalBalance = data?.formatted || "0.00";
  const availableBalance = totalBalance;

  const fetchSwapDetails = async () => {
    if (!fromAmount || fromAmount <= 0) return;

    try {
      // Chiamata all'API Uniswap
      const response = await axios.get("https://api.uniswap.org/v1/quote", {
        params: {
          tokenInAddress: "0xC02aaA39b223FE8D0A0E5C4F27EAD9083C756Cc2", // WETH (Wrapped ETH)
          tokenOutAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
          tokenInChainId: 1, // Ethereum Mainnet ID per il token di input
          tokenOutChainId: 1, // Ethereum Mainnet ID per il token di output
          amount: ethers.parseEther(fromAmount).toString(), // Converti in wei
          type: "exactIn", // Usa "exactIn" o "exactOut" in base alla tua logica
        },
      });

      // Estrazione dei dati dalla risposta
      const { route, quote, quoteDecimals, priceImpact } = response.data;
      
      // Calcolare il prezzo e la quantità minima ricevuta
      const price = route[0].amountOut / route[0].amountIn; // Prezzo per unità
      const minReceived = route[0].amountOut / Math.pow(10, route[0].tokenOut); // Quantità minima ricevuta in USDT
      const adjustedPrice = (quote / Math.pow(10, parseInt(quoteDecimals))).toFixed(6); // Prezzo aggiustato per gas

      setPriceDetails({
        price: adjustedPrice,
        minReceived: minReceived.toFixed(6),
        priceImpact: priceImpact,
      });

      // Calcolare la quantità "toAmount" in base alla quantità di "fromAmount"
      setToAmount((fromAmount * price).toFixed(2));

    } catch (error) {
      console.error(
        "Errore nel recuperare i dettagli dello swap:",
        error.response?.data || error.message
      );
    }
  };

  // Esegui la chiamata API quando `fromAmount` cambia
  useEffect(() => {
    fetchSwapDetails();
  }, [fromAmount]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white bg-white/40 backdrop-filter-sm rounded-3xl p-10">
        <h2 className="text-2xl font-bold mb-6">Stake Tokens</h2>

        {/* From Token */}
        <div className="bg-white bg-white/40 backdrop-filter-sm p-4 rounded-xl mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">From</span>
            <span className="text-gray-500">Balance: 0.0</span>
          </div>
          <div className="flex gap-4">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-2xl outline-none flex-1"
            />
            <button className="px-4 py-2 bg-gray-100 rounded-xl font-medium flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
              ETH
            </button>
          </div>
        </div>

        {/* Stake Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50">
            <ArrowDownIcon className="w-5 h-5" />
          </button>
        </div>

        {/* To Token */}
        <div className="bg-white bg-white/40 backdrop-filter-sm p-4 rounded-xl mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">To</span>
            <span className="text-gray-500">Balance: 0.0</span>
          </div>
          <div className="flex gap-4">
            <input
              type="number"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-2xl outline-none flex-1"
            />
            <button className="px-4 py-2 bg-gray-100 rounded-xl font-medium flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              Select token
            </button>
          </div>
        </div>

        {/* Stake Details */}
        <div className="bg-white bg-white/40 backdrop-filter-sm p-4 rounded-xl mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Price</span>
            <span>
              {priceDetails.price
                ? `1 WETH = ${priceDetails.price} USDT`
                : "Loading..."}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Minimum received</span>
            <span>
              {priceDetails.minReceived ? `${priceDetails.minReceived} USDT` : "Loading..."}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Price Impact</span>
            <span className="text-green-500">
              {priceDetails.priceImpact ? `${priceDetails.priceImpact}%` : "Loading..."}
            </span>
          </div>
        </div>

       
        {!isConnected ? (
          <WalletOptions isHeaderButton={false} />
        ) : (
          <button className="w-full py-4 bg-primary text-white rounded-2xl font-medium hover:bg-primary/90">
            Stake
          </button>
        )}
      </div>
    </div>
  );
}
