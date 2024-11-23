import ConnectWalletButton from "./wallet/ConnectWalletButton";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-2">
      <div className="flex flex-col md:flex-row space-y-5 mb-4 md:mb-0 md:space-y-0 md:space-x-5 w-full">
        <div className="relative w-full md:w-96">
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
            className="w-full px-4 py-2 border-none text-black bg-white/30 shadow-sm rounded-xl focus:outline-none transition duration-300 ease-in-out focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/30 rounded-xl w-full md:w-auto">
          <span>Base Chain</span>
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-2 md:mt-0 w-full md:w-auto justify-end">
        <ConnectWalletButton />
      </div>
    </div>
  );
}
