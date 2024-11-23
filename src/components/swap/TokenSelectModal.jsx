import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import tokens from "../../utils/tokens";

export default function TokenSelectModal({
  isOpen,
  onClose,
  onSelect,
  selectedToken,
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 rounded-3xl"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-6 md:mx-8 lg:w-96"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-lg font-bold"
          >
            Select Token
          </motion.h3>
          <button
            onClick={onClose}
            className="text-gray-600 bg-gray-50 backdrop-filter-sm rounded-xl p-2 hover:bg-gray-100"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Token List */}
        <ul>
          {tokens.map((token, index) => (
            <motion.li
              key={token.address}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05, // Ritardo per un effetto "stagger"
              }}
              className={`flex items-center justify-between mb-2 p-4 rounded-lg cursor-pointer ${
                selectedToken?.address === token.address
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={token.logoURI}
                  alt={token.symbol}
                  className="w-8 h-8"
                />
                <div>
                  <p className="font-semibold">{token.symbol}</p>
                  <p className="text-sm text-gray-500">{token.name}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
