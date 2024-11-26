import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";

const MintForm = () => {
  const tokenData = [
    {
      id: 1,
      name: "Amazon",
      crypto: "gAMZN",
      image:
        "https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Amazon-1024.png",
      address: "0xdqo2oj3o2f2j3o2f3j2o3f2j3o2f3j2o3f2j3o",
      current_price: 1000,
      total_volume: 1000000,
    },
    {
      id: 2,
      name: "Apple",
      crypto: "gAAPL",
      image:
        "https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-1024.png",
      address: "0xdqo2oj3o2f2j3o2f3j2o3f2j3o2f3j2o3f2j3o",
      current_price: 500,
      total_volume: 500000,
    },
    {
      id: 3,
      name: "Google",
      crypto: "gGOOGL",
      image:
        "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png",
      address: "0xdqo2oj3o2f2j3o2f3j2o3f2j3o2f3j2o3f2j3o",
      current_price: 200,
      total_volume: 200000,
    },
    {
      id: 4,
      name: "Microsoft",
      crypto: "gMSFT",
      image:
        "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/78-microsoft-1024.png",
      address: "0xdqo2oj3o2f2j3o2f3j2o3f2j3o2f3j2o3f2j3o",
      current_price: 100,
      total_volume: 100000,
    },
    {
      id: 5,
      name: "Tesla",
      crypto: "gTSLA",
      image: "https://cdn0.iconfinder.com/data/icons/logos-21/40/Tesla-128.png",
      address: "0xdqo2oj3o2f2j3o2f3j2o3f2j3o2f3j2o3f2j3o",
      current_price: 50,
      total_volume: 50000,
    },
    {
      id: 6,
      name: "Facebook",
      crypto: "gFB",
      image:
        "https://cdn1.iconfinder.com/data/icons/logotypes/32/facebook-512.png",
      address: "0xdqo2oj3o2f2j3o2f3j2o3f2j3o2f3j2o3f2j3o",
      current_price: 10,
      total_volume: 10000,
    },
  ];

return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokenData.map((token) => (
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                key={token.id}
                className="bg-white/30 rounded-3xl shadow-lg p-6 hover:bg-white/40"
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
                            className="w-10 h-10 me-5"
                        />

                        <div className="flex flex-col">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-base font-semibold"
                            >
                                {token.crypto}
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-xs font-medium"
                            >
                                {token.name}
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-dark text-xs underline flex"
                            >
                                {token.address.slice(0, 4)}...{token.address.slice(-4)} <GoArrowUpRight />
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
                <div className="flex flex-col items-center justify-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-dark text-sm mb-2"
                    >
                        Price: ${token.current_price.toLocaleString()}
                    </motion.p>
                </div>

                <button className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg w-full mt-1">
                    Open Vault
                </button>
            </motion.div>
        ))}
    </motion.div>
);
};

export default MintForm;
