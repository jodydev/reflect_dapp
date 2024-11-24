import tokens from "../../utils/tokens";
import { XMarkIcon } from "@heroicons/react/24/outline";

const TokenSelectModal = ({ isOpen, onClose, onSelect, selectedToken }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 rounded-3xl">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-6 md:mx-8 lg:w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Select Token</h3>
          <button
            onClick={onClose}
            className="text-gray-600 bg-gray-50 backdrop-filter-sm rounded-xl p-2 hover:bg-gray-100"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <ul>
          {tokens.map((token) => (
            <li
              key={token.address}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TokenSelectModal;
