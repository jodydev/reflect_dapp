import { useRef } from "react";
import { motion } from "framer-motion"; 
import { getTokenPrices } from "../../hooks/getTokenPrices";

const TrendingTokens = () => {
  const { tokenData, loading, error } = getTokenPrices();
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  let animationFrame;

  const handleMouseDown = (e) => {
    const container = scrollContainerRef.current;
    isDragging.current = true;
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
    velocity.current = 0;
    container.style.scrollBehavior = "auto"; 
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const container = scrollContainerRef.current;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const delta = x - startX.current;

    velocity.current = delta * 0.2; // Imposta la velocità basata sul movimento
    container.scrollLeft = scrollLeft.current - delta;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    addSmoothScrolling();
  };

  const addSmoothScrolling = () => {
    const container = scrollContainerRef.current;

    const smoothScroll = () => {
      velocity.current *= 0.95; // Riduce gradualmente la velocità
      container.scrollLeft -= velocity.current;

      if (Math.abs(velocity.current) > 0.5) {
        animationFrame = requestAnimationFrame(smoothScroll);
      } else {
        cancelAnimationFrame(animationFrame);
      }
    };

    smoothScroll();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold mb-4">Trending Tokens</h2>
      <motion.div
        ref={scrollContainerRef}
        className="flex rounded-xl w-full overflow-x-hidden cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }} // Animazione di entrata per il contenitore
      >
        {tokenData &&
          tokenData.map((token) => (
            <motion.div
              key={token.id}
              className="p-4 w-full min-w-[200px] flex items-center gap-3 transition duration-500 hover:cursor-pointer bg-white/20 backdrop-blur-sm rounded-xl"
              whileHover={{
                scale: 1.05, // Leggera animazione di zoom sui token
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }} // Effetto di pressione sui token
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
                <motion.p
                  className={`text-sm ${
                    token.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }} // Animazione di entrata
                >
                  {token.price_change_percentage_24h.toFixed(2)}%
                </motion.p>
                <p className="text-xs text-gray-500">
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
