import { useState, useEffect } from "react";
import { ArrowsUpDownIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";
import { useAccount, useBalance, useContractWrite } from "wagmi";
import { ethers } from "ethers";
import tokens from "../utils/tokens";
import axios from "axios";

import TokenSelectModal from "./swap/TokenSelectModal";
import SlippageSelector from "./swap/SlippageSelector";
import PriceDetails from "./swap/PriceDetails";

const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const UNISWAP_ROUTER_ABI = []; // Inserisci l'ABI del router Uniswap

export default function SwapForm() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isSelectingFromToken, setIsSelectingFromToken] = useState(false);
  const [isSelectingToToken, setIsSelectingToToken] = useState(false);
  const [slippage, setSlippage] = useState(0.5); // 0.5% default slippage
  const [priceDetails, setPriceDetails] = useState({
    price: null,
    minReceived: null,
    priceImpact: null,
    route: null,
    isLoading: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { address } = useAccount();
  const { data: fromTokenBalance } = useBalance({
    address,
    token: fromToken.address,
    watch: true,
  });

  const { data: toTokenBalance } = useBalance({
    address,
    token: toToken.address,
    watch: true,
  });

  const { write: executeSwap, isLoading: isSwapping } = useContractWrite({
    address: UNISWAP_ROUTER_ADDRESS,
    abi: UNISWAP_ROUTER_ABI,
    functionName: "swapExactTokensForTokens",
    args: priceDetails.route
      ? [
          ethers.parseUnits(fromAmount || "0", fromToken.decimals),
          ethers.parseUnits(priceDetails.minReceived || "0", toToken.decimals),
          priceDetails.route,
          address,
          Math.floor(Date.now() / 1000) + 1800, // 30-minute deadline
        ]
      : undefined,
    enabled: Boolean(priceDetails.route && fromAmount && toAmount),
  });

  useEffect(() => {
    if (fromAmount && fromAmount > 0) fetchSwapDetails();
  }, [fromAmount, fromToken, toToken, slippage]);

  const fetchSwapDetails = async () => {
    if (!fromAmount || fromAmount <= 0) return;

    setPriceDetails((prev) => ({ ...prev, isLoading: true }));
    setError("");

    try {
      const response = await axios.get("https://api.uniswap.org/v1/quote", {
        params: {
          tokenInAddress: fromToken.address,
          tokenOutAddress: toToken.address,
          tokenInChainId: 1,
          tokenOutChainId: 1,
          amount: ethers.parseUnits(fromAmount, fromToken.decimals).toString(),
          type: "exactIn",
        },
      });

      const { route, quote, priceImpact } = response.data;
      const price = ethers.formatUnits(quote, toToken.decimals);
      const minReceived = (Number(price) * (1 - slippage / 100)).toFixed(
        toToken.decimals
      );

      setPriceDetails({
        price: (quote / Math.pow(10, toToken.decimals)).toFixed(6),
        minReceived,
        priceImpact,
        route: route[0].map((hop) => hop.tokenAddress),
        isLoading: false,
      });
      setToAmount(price);
    } catch (err) {
      setError("Failed to fetch swap details. Please try again.");
      console.error(err);
      setPriceDetails((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSwap = async () => {
    if (!fromAmount || !toAmount || fromAmount <= 0 || toAmount <= 0) {
      setError("Please enter valid amounts.");
      return;
    }

    try {
      await executeSwap?.();
    } catch (err) {
      setError("Swap failed. Please try again.");
      console.error(err);
    }
  };

  const resetForm = () => {
    setFromToken(tokens[0]);
    setToToken(tokens[1]);
    setFromAmount("");
    setToAmount("");
    setSlippage(0.5);
    setPriceDetails({
      price: null,
      minReceived: null,
      priceImpact: null,
      route: null,
      isLoading: false,
    });
    setError("");
  };

  return (
    <div className="w-2/3 max-w-xl mx-auto">
      <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
        <SlippageSelector resetForm={resetForm} />

        <TokenSelectModal
          isOpen={isSelectingFromToken}
          onClose={() => setIsSelectingFromToken(false)}
          onSelect={(token) => setFromToken(token)}
          selectedToken={fromToken}
        />

        <TokenSelectModal
          isOpen={isSelectingToToken}
          onClose={() => setIsSelectingToToken(false)}
          onSelect={(token) => setToToken(token)}
          selectedToken={toToken}
        />

        <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">From</span>
            <span className="text-gray-500">
              Balance: {fromTokenBalance?.formatted || "0.00"}
            </span>
          </div>
          <div className="flex gap-4">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-2xl outline-none flex-1"
            />
            <button
              onClick={() => setIsSelectingFromToken(true)}
              className="bg-white/60 backdrop-filter-sm rounded-xl p-2 hover:bg-white hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={fromToken.logoURI}
                alt={fromToken.symbol}
                className="w-8 h-8"
              />
            </button>
          </div>
        </div>

        <div className="absolute z-20 left-[45%] top-[33%]">
          <button
            onClick={() => {
              setFromToken(toToken);
              setToToken(fromToken);
              setFromAmount("");
              setToAmount("");
            }}
            className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <ArrowsUpDownIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">To</span>
            <span className="text-gray-500">
              Balance: {toTokenBalance?.formatted || "0.00"}
            </span>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              value={toAmount}
              disabled
              placeholder="0.0"
              className="bg-transparent text-2xl outline-none flex-1"
            />
            <button
              onClick={() => setIsSelectingToToken(true)}
              className="bg-white/60 backdrop-filter-sm rounded-xl p-2 hover:bg-white  hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={toToken.logoURI}
                alt={toToken.symbol}
                className="w-8 h-8"
              />
            </button>
          </div>
        </div>

        <PriceDetails priceDetails={priceDetails} />

        {error && <div className="text-red-500 mt-2">{error}</div>}

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSwap}
            disabled={isSwapping || !priceDetails.route}
            className="w-full bg-primary text-white py-3 rounded-xl"
          >
            {isSwapping ? <Loader2 className="animate-spin" /> : "Swap"}
          </button>
        </div>
      </div>
    </div>
  );
}
