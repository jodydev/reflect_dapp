import * as React from "react";
import { useState } from "react";
import { useConnect } from "wagmi";
import { X, Wallet } from "lucide-react";
import walletLogos from "../../utils/walletLogos";
import { ShieldCheck, Lock } from "lucide-react";

export default function WalletOptionsModal({ isHeaderButton }) {
  const { connectors, connect } = useConnect();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalRef = React.useRef(null);

  // Funzione per il trascinamento verticale
  const handleMouseDown = (event) => {
    const modal = modalRef.current;
    if (!modal) return;

    let startY = event.pageY; // Coordinate iniziali
    let scrollTop = modal.scrollTop; // Posizione corrente dello scroll

    // Disabilita la selezione del testo
    document.body.style.userSelect = "none";

    const handleMouseMove = (moveEvent) => {
      const deltaY = moveEvent.pageY - startY; // Differenza verticale
      modal.scrollTop = scrollTop - deltaY; // Aggiorna la posizione dello scroll
    };

    const handleMouseUp = () => {
      // Rimuove il listener e ripristina la selezione del testo
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = ""; // Ripristina la selezione
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setModalIsOpen(true)}
        className="text-nowrap py-2 px-6 bg-primary text-white rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95 flex items-center justify-center w-full md:w-auto"
      >
        Connect Wallet
      </button>

      {modalIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            ref={modalRef}
            onMouseDown={handleMouseDown} // Aggiunge il drag scroll
            className="absolute w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxHeight: "90vh",
              overflow: "hidden", // Nasconde le barre di scorrimento
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalIsOpen(false)}
              className="absolute top-4 right-4 z-50 text-gray-500 hover:text-gray-700 rounded-full p-2 hover:cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center pt-8 pb-6 relative z-10">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Connect Wallet
              </h2>
              <p className="text-gray-600 px-8">
                Select a wallet to connect securely to the application
              </p>
            </div>

            {/* Wallet Grid */}
            <div className="grid grid-cols-2 gap-4 p-6 pt-0">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => {
                    connect({ connector });
                    setModalIsOpen(false);
                  }}
                  className="flex flex-col items-center justify-center p-5 bg-gray-100 rounded-xl border-2 border-transparent transition-all duration-300 transform hover:scale-105 hover:bg-primary hover:text-white relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary opacity-0 hover:opacity-10 transition-opacity"></div>

                  <img
                    src={walletLogos[connector.name] || Wallet}
                    alt={`${connector.name} logo`}
                    className="w-12 h-12 mb-3 object-contain drop-shadow-md"
                  />
                  <span className="text-sm font-semibold text-gray-800 mb-1">
                    {connector.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    Secure Connection
                  </span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center pt-4 pb-10 flex items-center justify-center">
              <Lock className="w-4 h-4 mr-2 text-gray-500" />
              <p className="text-xs text-gray-600">
                Your wallet is securely connected via WalletConnect
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
