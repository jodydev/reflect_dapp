import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const SlippageSelector = ({ resetForm }) => {
  const [slippage, setSlippage] = useState(0.5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const slippageOptions = [1, 25, 50, 100];

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Swap Tokens</h2>
      <div className="relative flex flex-row space-x-3">
        <button
          onClick={resetForm}
          className="text-gray-500 hover:text-primary p-2"
          title="Reset Form"
        >
          <ArrowPathIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center text-sm bg-white/60 backdrop-filter-sm px-3 py-1 rounded-lg hover:bg-white/40 transition-colors"
        >
          Slippage: {slippage}%
          <ChevronDown className="ml-2 w-4 h-4" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 top-10 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SlippageSelector;
