import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function AddLiquidityModal({ onClose }) {
  const [token1Amount, setToken1Amount] = useState("");
  const [token2Amount, setToken2Amount] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full p-6">
        <h2 className="text-xl font-bold mb-6">Add Liquidity</h2>

        <div className="bg-gray-50 p-4 rounded-xl mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Input</span>
            <span className="text-gray-500">Balance: 0.0</span>
          </div>
          <div className="flex gap-4">
            <input
              type="number"
              value={token1Amount}
              onChange={(e) => setToken1Amount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-2xl outline-none flex-1"
            />
            <button className="px-4 py-2 bg-gray-100 rounded-xl font-medium flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
              ETH
            </button>
          </div>
        </div>

        <div className="flex justify-center -my-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <PlusIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Input</span>
            <span className="text-gray-500">Balance: 0.0</span>
          </div>
          <div className="flex gap-4">
            <input
              type="number"
              value={token2Amount}
              onChange={(e) => setToken2Amount(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-2xl outline-none flex-1"
            />
            <button className="px-4 py-2 bg-gray-100 rounded-xl font-medium flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              RFL
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 rounded-xl font-medium"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 bg-primary text-white rounded-xl font-medium">
            Add Liquidity
          </button>
        </div>
      </div>
    </div>
  );
}
