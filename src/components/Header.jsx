import React from "react";
import SearchBar from "./SearchBar";
import ConnectWalletButton from "./wallet/ConnectWalletButton";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-2">
      <div className="flex flex-col md:flex-row space-y-5 mb-4 md:mb-0 md:space-y-0 md:space-x-5 w-full">
        <SearchBar />
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
