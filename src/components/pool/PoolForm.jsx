import { useState } from "react";
import { PlusIcon, MinusIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import AddLiquidityModal from "./AddLiquidityModal";

export default function PoolForm() {
  const [showAddLiquidity, setShowAddLiquidity] = useState(false);

  const pools = [
    {
      pair: "ETH/RFL",
      token1Symbol: "ETH",
      token2Symbol: "RFL",
      tvl: "$1,234,567",
      apr: "12.5%",
      volume24h: "$123,456",
      myLiquidity: "$0",
      token1Price: "1 ETH = 1,800 RFL",
      token2Price: "1 RFL = 0.00055 ETH",
    },
    {
      pair: "USDT/RFL",
      token1Symbol: "USDT",
      token2Symbol: "RFL",
      tvl: "$567,890",
      apr: "8.2%",
      volume24h: "$89,012",
      myLiquidity: "$0",
      token1Price: "1 USDT = 2.5 RFL",
      token2Price: "1 RFL = 0.4 USDT",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => setShowAddLiquidity(true)}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Liquidity
          </button>
          <button className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 flex items-center gap-2">
            <MinusIcon className="w-5 h-5" />
            Remove Liquidity
          </button>
        </div>
      </div>

      <div className="bg-white/30 rounded-3xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Your Liquidity Positions</h2>
        <div className="text-center py-12 text-gray-500">No active liquidity positions</div>
      </div>

      <div className="bg-white/30 rounded-3xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Available Pools</h2>
        <div className="space-y-4">
          {pools.map((pool) => (
            <div key={pool.pair} className="bg-white/40 rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary ring-2 ring-white"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 ring-2 ring-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{pool.pair}</h3>
                    <div className="text-gray-500 text-sm">Pool</div>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-gray-500 text-sm">TVL</div>
                  <div className="font-medium">{pool.tvl}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">APR</div>
                  <div className="font-medium text-green-500">{pool.apr}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">24h Volume</div>
                  <div className="font-medium">{pool.volume24h}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">My Liquidity</div>
                  <div className="font-medium">{pool.myLiquidity}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div>{pool.token1Price}</div>
                  <div>{pool.token2Price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddLiquidity && (
        <AddLiquidityModal onClose={() => setShowAddLiquidity(false)} />
      )}
    </div>
  );
}
