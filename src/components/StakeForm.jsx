import { getTokenPrices } from "../hooks/getTokenPrices";
import { motion } from "framer-motion";

const StakeForm = () => {
  const { tokenData, loading, error } = getTokenPrices();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tokenData.map((token) => (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          key={token.id}
          className="bg-white/30 rounded-3xl shadow-lg p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <img
                src={token.image}
                alt={token.name}
                className="w-6 h-6 rounded-full"
              />
              <h3 className="text-base font-medium">{token.name}</h3>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }} className="text-gray-400 text-xs">
              PRC: {token.price_change_percentage_24h.toFixed()} %
            </motion.p>
          </motion.div>
          <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }} className="text-dark text-sm mb-2">
            Liquidity: ${token.total_volume.toLocaleString()}
          </motion.p>
          <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }} className="text-dark text-sm mb-2">
            Price: ${token.current_price.toLocaleString()}
          </motion.p>
          <button className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg w-full mt-1">
            STAKE
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StakeForm;
