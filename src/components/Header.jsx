import { useAccount, useConnect, useDisconnect } from "wagmi";
import Setting from "../assets/icons/setting.png";
import WalletOptions from "./wallet/WalletOptions";

export default function Header() {
  const { isConnected, address, isConnecting } = useAccount(); 
  const { disconnect } = useDisconnect();

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex flex-row space-x-5">
        <div className="relative w-96">
          <span className="absolute inset-y-0 right-0 flex items-center pr-5">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border-none text-black bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-3xl">
          <span>Base Chain</span>
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/20 rounded-lg transition duration-300 ease-in-out transform hover:scale-110">
          <img src={Setting} className="w-6 h-6" />
        </button>

        {!isConnected ? (
          <WalletOptions />
        ) : (
          <button
            onClick={disconnect}
            className="py-2 px-6 bg-dark text-white rounded-3xl transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95 flex items-center justify-center"
          >
            Disconnect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
