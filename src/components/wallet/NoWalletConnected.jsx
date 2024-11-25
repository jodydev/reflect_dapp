import InjectedLogo from '../../assets/images/injected.png'
import { motion } from "framer-motion";

export default function NoWalletConnected() {
  return (
    <motion.div
      className="mb-20 md:mb-0 w-full bg-white/30 backdrop-blur-sm relative z-10 flex flex-col items-center justify-center rounded-3xl p-8 shadow-lg space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="rounded-full w-20 h-full bg-white/60 p-4 mb-4 shadow-xl hover:scale-110 transform transition-all duration-300 ease-in-out"
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={InjectedLogo} className="w-20 h-full" />
      </motion.div>
      <motion.h1
        className="text-2xl font-bold mb-3 text-gray-800 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Wallet Connection
      </motion.h1>
      <motion.p
        className="text-gray-600 text-center mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Connect your wallet to view your balance and manage your assets.
      </motion.p>
      
    </motion.div>
  );
}
