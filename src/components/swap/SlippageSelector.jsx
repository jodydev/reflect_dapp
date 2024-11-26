import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function SlippageSelector() {
  const [slippage, setSlippage] = useState(0.5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const slippageOptions = [1, 25, 50, 100];

  return (
    <div className="p-2">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center text-sm bg-white/60 backdrop-filter-sm px-3 py-1 rounded-lg hover:bg-white/40 transition-colors"
      >
        Slippage: {slippage}%
        <ChevronDown className="ml-2 w-4 h-4" />
      </button>
      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 top-10 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10"
        >
          {slippageOptions.map((option) => (
            <button
              onClick={() => {
                setSlippage(option);
                setIsDropdownOpen(false);
              }}
              className={`w-full text-left text-sm px-3 py-2 ${
                slippage === option
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-50"
              }`}
              data-key={option}
            >
              {option}%
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
