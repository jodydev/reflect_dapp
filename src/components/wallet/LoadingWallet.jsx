import { motion } from "framer-motion";

export default function LoadingWallet() {
  return (
    <motion.div
      className="w-full bg-white/30 rounded-3xl p-6 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 max-w-sm w-full mx-auto">
        <motion.div
          className="animate-pulse flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        >
          <div className="rounded-full bg-white bg-white/30 backdrop-blur-sm h-16 w-16"></div>
          <div className="flex-1 space-y-6 py-1">
            {/* Righe di caricamento con animazione di pulsazione e leggeri spostamenti */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-2 animate-pulse"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
                <motion.div
                  className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-1 animate-pulse delay-200"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
              </div>
              <motion.div
                className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded animate-pulse delay-400"
                initial={{ width: 0 }}
                animate={{ width: "90%" }}
                transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
              />
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-2 animate-pulse"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
                <motion.div
                  className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-1 animate-pulse delay-200"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
              </div>
              <motion.div
                className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded animate-pulse delay-400"
                initial={{ width: 0 }}
                animate={{ width: "90%" }}
                transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
              />
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-2 animate-pulse"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
                <motion.div
                  className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-1 animate-pulse delay-200"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
              </div>
              <motion.div
                className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded animate-pulse delay-400"
                initial={{ width: 0 }}
                animate={{ width: "90%" }}
                transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
              />
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-2 animate-pulse"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
                <motion.div
                  className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-1 animate-pulse delay-200"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
              </div>
              <motion.div
                className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded animate-pulse delay-400"
                initial={{ width: 0 }}
                animate={{ width: "90%" }}
                transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
              />
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-2 animate-pulse"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
                <motion.div
                  className="h-2 bg-white bg-white/30 backdrop-blur-sm rounded col-span-1 animate-pulse delay-200"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
