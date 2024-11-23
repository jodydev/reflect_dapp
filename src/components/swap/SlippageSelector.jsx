import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Settings } from "lucide-react";

export default function SlippageSelector({ resetForm }) {
  const [slippage, setSlippage] = useState(0.5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const slippageOptions = [1, 25, 50, 100];

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center mb-6"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="hidden md:block text-2xl font-bold"
      >
        Swap Tokens
      </motion.h2>
      <div className="relative flex flex-row space-x-6 md:space-x-2">
        <button
          onClick={resetForm}
          className="text-gray-500 hover:text-primary p-2 rounded-lg hover:bg-white/20 transition duration-300 ease-in-out transform hover:scale-110"
          title="Reset Form"
        >
          <ArrowPathIcon className="w-6 h-6" />
        </button>
        <button className="text-gray-500 hover:text-primary p-2 rounded-lg hover:bg-white/20 transition duration-300 ease-in-out transform hover:scale-110">
          <Settings className="w-6 h-6" />
        </button>
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
                key={option}
                onClick={() => {
                  setSlippage(option);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left text-sm px-3 py-2 ${
                  slippage === option
                    ? "bg-gray-100 font-semibold"
                    : "hover:bg-gray-50"
                }`}
              >
                {option}%
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
