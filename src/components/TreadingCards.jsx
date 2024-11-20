import React, { useEffect, useState } from "react";
import axios from "axios";

const TrendingTokens = () => {
  const [tokenData, setTokenData] = useState([]);

  const fetchTokenPrices = async () => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum,bitcoin,tether,binancecoin,cardano,solana,polkadot,ltc,dogecoin";

    try {
      const response = await axios.get(url);
      console.log("Token prices:", response.data);
      // Save the data in localStorage
      localStorage.setItem("tokenData", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching token prices:", error);
      return null;
    }
  };

  useEffect(() => {
    // Check if data is in localStorage
    const cachedData = localStorage.getItem("tokenData");

    if (cachedData) {
      // If data exists in localStorage, use it
      setTokenData(JSON.parse(cachedData));
    } else {
      // If no data in localStorage, fetch it from the API
      fetchTokenPrices().then((data) => {
        if (data) {
          setTokenData(data);
        }
      });
    }
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold mb-4">Trending Tokens</h2>
      <div className="flex rounded-xl w-full overflow-x-auto">
        {tokenData &&
          tokenData.map((token) => (
            <div
              key={token.id}
              className="p-4 w-full min-w-[200px] flex items-center gap-3 transition duration-500 hover:cursor-pointer bg-white/40 backdrop-blur-sm"
            >
              <img
                src={token.image}
                alt={token.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <span className="font-bold text-sm">
                  {token.name} ({token.symbol.toUpperCase()})
                </span>
                <p className="text-sm mt-2">${token.current_price}</p>
                <p
                  className={`text-sm ${
                    token.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {token.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p className="text-xs text-gray-500">
                  Market Cap Rank: {token.market_cap_rank}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrendingTokens;
