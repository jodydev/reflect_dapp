// src/pages/Liquidity.jsx
import React, { useState } from 'react';
import { PlusIcon, MinusIcon, ChevronRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const Liquidity = () => {
  const [token1Amount, setToken1Amount] = useState('');
  const [token2Amount, setToken2Amount] = useState('');
  const [showAddLiquidity, setShowAddLiquidity] = useState(false);

  const pools = [
    {
      pair: 'ETH/RFL',
      token1Symbol: 'ETH',
      token2Symbol: 'RFL',
      tvl: '$1,234,567',
      apr: '12.5%',
      volume24h: '$123,456',
      myLiquidity: '$0',
      token1Price: '1 ETH = 1,800 RFL',
      token2Price: '1 RFL = 0.00055 ETH'
    },
    {
      pair: 'USDT/RFL',
      token1Symbol: 'USDT',
      token2Symbol: 'RFL',
      tvl: '$567,890',
      apr: '8.2%',
      volume24h: '$89,012',
      myLiquidity: '$0',
      token1Price: '1 USDT = 2.5 RFL',
      token2Price: '1 RFL = 0.4 USDT'
    }
  ];

  const AddLiquidityModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full p-6">
        <h2 className="text-xl font-bold mb-6">Add Liquidity</h2>

        {/* First Token Input */}
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

        {/* Second Token Input */}
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

        {/* Pool Information */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Pool Share</span>
            <span>0%</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Rate</span>
            <span>1 ETH = 1,800 RFL</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setShowAddLiquidity(false)}
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

  return (
    <div className="max-w-4xl mx-auto pt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Liquidity Pools</h1>
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

      {/* Your Liquidity Positions */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Your Liquidity Positions</h2>
        <div className="text-center py-12 text-gray-500">
          No active liquidity positions
        </div>
      </div>

      {/* Available Pools */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Available Pools</h2>
        
        <div className="space-y-4">
          {pools.map((pool) => (
            <div key={pool.pair} className="bg-gray-50 rounded-xl p-6">
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

      {showAddLiquidity && <AddLiquidityModal />}
    </div>
  );
};

export default Liquidity;