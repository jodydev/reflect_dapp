import * as React from "react";
import { useState } from "react";
import { useConnect } from "wagmi";
import { ShieldCheck, Lock, X, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import walletLogos from "../../utils/walletLogos";

export default function WalletOptionsModal() {
  const { connectors, connect } = useConnect();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalRef = React.useRef(null);

  // Funzione per il trascinamento verticale
  const handleMouseDown = (event) => {
    const modal = modalRef.current;
    if (!modal) return;

    let startY = event.pageY;
    let scrollTop = modal.scrollTop;

    document.body.style.userSelect = "none";

    const handleMouseMove = (moveEvent) => {
      const deltaY = moveEvent.pageY - startY;
      modal.scrollTop = scrollTop - deltaY;

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };
  };

  return (
    <div className="w-full">
      {/* Button to open modal */}
      <button
        onClick={() => setModalIsOpen(true)}
        className="text-nowrap py-2 px-6 bg-primary text-white rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02] active:scale-95 flex items-center justify-center w-full md:w-auto"
      >
        Connect Wallet
      </button>

      {/* Modal */}
      {modalIsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
            ref={modalRef}
            onMouseDown={handleMouseDown}
            className="absolute md:top-[10%] md:left-[35%] 2xl:top-[25%] 2xl:left-[40%] w-full md:max-w-md 2xl:max-w-xl bg-white rounded-2xl shadow-2xl p-6"
            style={{
              transform: "translate(-50%, -50%)",
              overflow: "hidden",
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
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center pt-8 pb-6 relative z-10"
            >
              <div className="flex justify-center mb-4">
                <ShieldCheck className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Connect Wallet
              </h2>
              <p className="text-gray-600 px-8">
                Select a wallet to connect securely to the application
              </p>
            </motion.div>

            {/* Wallet Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-2 gap-4 p-6 pt-0"
            >
              {connectors.map((connector) => (
                <motion.button
                  key={connector.uid}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
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
                </motion.button>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center pt-4 pb-10 flex items-center justify-center"
            >
              <Lock className="w-4 h-4 mr-2 text-gray-500" />
              <p className="text-xs text-gray-600">
                Your wallet is securely connected via WalletConnect
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
