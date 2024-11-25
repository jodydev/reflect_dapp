import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getTokenPrices } from "../../hooks/getTokenPrices";

const TrendingTokens = () => {
  const { tokenData, loading, error } = getTokenPrices();
  const scrollContainerRef = useRef(null); // Riferimento al contenitore dello scroll
  const [isScrolling, setIsScrolling] = useState(true); // Stato per gestire lo scroll

  // Funzione per scorrere automaticamente
  const autoScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 1; // Velocità di scorrimento
      const maxScroll = container.scrollWidth - container.clientWidth; // Scorrimento massimo
      container.scrollLeft += scrollAmount; // Incremento della posizione

      // Se si è raggiunto la fine, torna indietro
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0;
      }
    }
  };

  // Esegui lo scroll automatico
  useEffect(() => {
    if (!isScrolling) return;

    const intervalId = setInterval(autoScroll, 20); // Esegui auto scroll ogni 20ms
    return () => clearInterval(intervalId); // Pulizia dell'intervallo quando il componente è smontato
  }, [isScrolling]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full mb-20">
      <h2 className="text-3xl font-semibold mb-4">Trending Tokens</h2>
      <motion.div
        ref={scrollContainerRef}
        className="flex rounded-xl w-full overflow-hidden cursor-grab"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ userSelect: "none" }}
        onMouseEnter={() => setIsScrolling(false)} // Pausa lo scroll quando l'utente passa sopra
        onMouseLeave={() => setIsScrolling(true)} // Riprende lo scroll quando l'utente esce
      >
        {tokenData &&
          tokenData.map((token) => (
            <motion.div
              key={token.id}
              className="p-4 w-full min-w-[200px] flex items-center transition duration-500 hover:cursor-pointer bg-white/20 backdrop-blur-sm"
            >
              <img
                src={token.image}
                alt={token.name}
                className="w-10 h-10 rounded-full me-3"
              />
              <div>
                <p
                  className="font-bold text-sm text-nowrap"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {token.name} ({token.symbol.toUpperCase()})
                </p>
                <p
                  className="text-sm mt-2"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  ${token.current_price}
                </p>
                <p
                  className={`text-sm ${
                    token.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {token.price_change_percentage_24h.toFixed(2)}%
                </p>

                <p
                  className="text-xs text-gray-500 text-nowrap"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Market Cap Rank: {token.market_cap_rank}
                </p>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default TrendingTokens;
