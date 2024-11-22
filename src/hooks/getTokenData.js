import { useState, useEffect } from "react";
import axios from "axios";

const cache = {};
const cacheExpirationTime = 5 * 60 * 1000; // 5 minuti per esempio

export const getTokenData = (tokenAddress) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = Date.now();

      if (cache[tokenAddress] && currentTime - cache[tokenAddress].timestamp < cacheExpirationTime) {
        setData(cache[tokenAddress].data);
        setLoading(false);
        return;
      }

      setLoading(true);

      const apiUrl = `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`;

      try {
        const response = await axios.get(apiUrl);
        const tokenData = response.data;

        console.log(tokenData);

        if (tokenData && tokenData.pairs) {
          const pair = tokenData.pairs[0];

          const parsedData = {
            price: parseFloat(pair.priceUsd).toFixed(4),
            marketCap: pair.marketCap ? parseFloat(pair.marketCap).toLocaleString() : "N/A",
            tokensStaked: parseFloat(pair.liquidity.base).toLocaleString(),
            txns: pair.txns,
            volume: pair.volume,
            priceChange: {
              m5: pair.priceChange.m5,
              h1: pair.priceChange.h1,
              h6: pair.priceChange.h6,
              h24: pair.priceChange.h24,
            },
          };

          // Memorizza i dati nella cache con timestamp
          cache[tokenAddress] = { data: parsedData, timestamp: currentTime };
          setData(parsedData);
        } else {
          throw new Error("No data found for the token.");
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tokenAddress]);

  return { data, loading, error };
};
