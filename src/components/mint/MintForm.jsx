import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { tokenDataMint } from "../../utils/tokenDataMint";

const MintForm = () => {
 
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tokenDataMint.map((token) => (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          key={token.id}
          className="bg-white/30 rounded-3xl shadow-lg p-6 hover:bg-white/40 w-full max-w-96"
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <img
                src={token.image}
                alt={token.name}
                className="w-10 h-10 2xl:w-16 2xl:h-16 me-5"
              />

              <div className="flex flex-col">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-base 2xl:text-xl font-semibold"
                >
                  {token.crypto}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs 2xl:text-lg font-medium"
                >
                  {token.name}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-dark text-xs 2xl:text-base underline flex"
                >
                  {token.address.slice(0, 4)}...{token.address.slice(-4)}{" "}
                  <GoArrowUpRight />
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
          <div className="flex flex-col items-center justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-dark text-sm 2xl:text-lg mb-2"
            >
              Price:{" "}
              <span className="font-bold text-md">
                ${token.current_price.toLocaleString()}
              </span>
            </motion.p>
          </div>

          <button className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-3xl text-sm 2xl:text-base w-full mt-1">
            Open Vault
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MintForm;
