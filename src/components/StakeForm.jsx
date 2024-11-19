import { useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default function StakeForm() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white bg-white/40 backdrop-filter-sm rounded-3xl p-10">
        <h2 className="text-2xl font-bold mb-6">Stake Tokens</h2>

        {/* From Token */}
        <div className="bg-gray-50 p-4 rounded-xl mb-4">
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
        <div className="bg-gray-50 p-4 rounded-xl mb-4">
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
        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Price</span>
            <span>1 ETH = 1,800 USDT</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Minimum received</span>
            <span>1,790 USDT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Price Impact</span>
            <span className="text-green-500">{"<0.01%"}</span>
          </div>
        </div>

        <button className="w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
