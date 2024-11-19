import * as React from "react";
import { useState } from "react";
import { useConnect } from "wagmi";
import { X, Wallet } from "lucide-react";
import walletLogos from "../../utils/walletLogos";

export default function WalletOptionsModal() {
  const { connectors, connect } = useConnect();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="flex items-center gap-2 bg-primary text-dark px-6 py-2 rounded-3xl hover:scale-105 transition duration-300 ease-in-out"
      >
        Connect Wallet
      </button>

      {modalIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-dark w-full max-w-md rounded-xl shadow-2xl p-6 relative">
            <button
              onClick={() => setModalIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Connect Wallet
              </h2>
              <p className="text-gray-500 mt-2">Choose a wallet to connect</p>
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => {
                    connect({ connector });
                    setModalIsOpen(false);
                  }}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border-2 border-primary hover:border-primary hover:bg-white transition-all"
                >
                  <img
                    src={walletLogos[connector.name] || Wallet}
                    alt={`${connector.name} logo`}
                    className="w-14 h-14 mb-2 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {connector.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
