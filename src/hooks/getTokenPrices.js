import { useState, useEffect } from "react";
import axios from "axios";

export const getTokenPrices = () => {
  const [tokenData, setTokenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTokenPrices = async () => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum,bitcoin,tether,binancecoin,cardano,solana,polkadot,ltc,dogecoin";

    try {
      const response = await axios.get(url);
      console.log("Token prices:", response.data);
      // Salva i dati in localStorage
      localStorage.setItem("tokenData", JSON.stringify(response.data));
      setTokenData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching token prices:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("tokenData");

    if (cachedData) {
      setTokenData(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetchTokenPrices();
    }
  }, []);

  return { tokenData, loading, error };
};
