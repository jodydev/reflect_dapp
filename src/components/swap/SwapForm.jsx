import { useState, useEffect } from "react";
import { ArrowsUpDownIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Loader2, Settings } from "lucide-react";
import { useAccount, useBalance, useContractWrite } from "wagmi";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import tokens from "../../utils/tokens";
import axios from "axios";

import TokenSelectModal from "./TokenSelectModal";
import SlippageSelector from "./SlippageSelector";
import PriceDetails from "./PriceDetails";

const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const UNISWAP_ROUTER_ABI = [];

export default function SwapForm() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isSelectingFromToken, setIsSelectingFromToken] = useState(false);
  const [isSelectingToToken, setIsSelectingToToken] = useState(false);
  const [slippage, setSlippage] = useState(10);
  const [error, setError] = useState("");
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [priceDetails, setPriceDetails] = useState({
    price: null,
    minReceived: null,
    priceImpact: null,
    route: null,
    isLoading: false,
  });

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
          Math.floor(Date.now() / 1000) + 1800,
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

  const openModalSettings = () => {
    setOpenSettingsModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl 2xl:max-w-2xl mx-auto px-0 md:px-6 lg:px-8"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SlippageSelector />
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/40 backdrop-blur-sm p-4 rounded-xl mb-4"
        >
          <div className="flex justify-between mb-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-sm sm:text-base"
            >
              From
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm sm:text-base"
            >
              Balance:{" "}
              {fromTokenBalance
                ? ethers.formatUnits(
                    fromTokenBalance.value,
                    fromTokenBalance.decimals
                  )
                : "0.00"}
            </motion.p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-xl sm:text-2xl outline-none flex-1 min-w-[100px] w-full sm:w-auto"
            />
            <button
              onClick={() => setIsSelectingFromToken(true)}
              className="bg-white/60 backdrop-filter-sm rounded-xl p-2 hover:bg-white hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={fromToken.logoURI}
                alt={fromToken.symbol}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 flex justify-center"
        >
          <button
            onClick={() => {
              setFromToken(toToken);
              setToToken(fromToken);
              setFromAmount("");
              setToAmount("");
            }}
            className="absolute -top-8 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <ArrowsUpDownIcon className="w-5 h-5" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/40 backdrop-blur-sm p-4 rounded-xl mb-4"
        >
          <div className="flex justify-between mb-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-sm sm:text-base"
            >
              To
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm sm:text-base"
            >
              Balance: {toTokenBalance?.formatted || "0.00"}
            </motion.p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              value={toAmount}
              disabled
              placeholder="0.0"
              className="bg-transparent text-xl sm:text-2xl outline-none flex-1 min-w-[100px] w-full sm:w-auto"
            />
            <button
              onClick={() => setIsSelectingToToken(true)}
              className="bg-white/60 backdrop-filter-sm rounded-xl p-2 hover:bg-white hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={toToken.logoURI}
                alt={toToken.symbol}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </button>
          </div>
        </motion.div>

        <PriceDetails priceDetails={priceDetails} />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-red-500 mt-2"
          >
            {error}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={handleSwap}
            disabled={isSwapping || !priceDetails.route}
            className="w-full bg-primary text-white py-3 rounded-xl"
          >
            {isSwapping ? <Loader2 className="animate-spin" /> : "Swap"}
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
