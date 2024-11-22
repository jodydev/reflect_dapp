import { useState } from "react";
import { getTokenData } from "../../hooks/getTokenData";
import { useFilteredData } from "../../hooks/useFilteredData";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import RFLChart from "./RFLChart";
import ChartTitle from "./ChartTitle";

const Charts = () => {
  const tokenAddress = "0x6e2c81b6c2C0e02360F00a0dA694e489acB0b05e";
  const { data, loading, error } = getTokenData(tokenAddress);

  const [timeframe, setTimeframe] = useState("24h");
  const [volume, setVolume] = useState("24h");
  const [transactions, setTransactions] = useState("24h");
  const filteredPriceChangeData = useFilteredData(
    data,
    "priceChange",
    timeframe
  );
  const filteredVolumeData = useFilteredData(data, "volume", volume);
  const filteredTransactionsData = useFilteredData(
    data,
    "transactions",
    transactions
  );

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="spin w-32 h-32 flex items-center justify-center text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div className="p-6 w-full h-full  flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-3xl">
        <div className="text-black text-3xl">
          Error to fetch data, please try after.
        </div>
      </motion.div>
    );
  }

  // Animazioni
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="w-full space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Main Chart */}
      <motion.div
        className="p-6 bg-white/20 backdrop-blur-sm rounded-3xl"
        variants={chartVariants}
      >
        <ChartTitle
          title="RFL"
          activeState={timeframe}
          setActiveState={setTimeframe}
        />
        <RFLChart
          data={filteredPriceChangeData}
          dataKey="value"
          gradient="#B88746"
          height={200}
          suffix="%"
        />
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {/* Volume Chart */}
        <motion.div
          className="p-6 bg-white/20 backdrop-blur-sm rounded-3xl"
          variants={chartVariants}
        >
          <ChartTitle
            title="Volume"
            activeState={volume}
            setActiveState={setVolume}
          />
          <RFLChart
            data={filteredVolumeData}
            dataKey="value"
            gradient="#8B8B8B"
            height={150}
            prefix="$"
          />
        </motion.div>

        {/* Transactions Chart */}
        <motion.div
          className="p-6 bg-white/20 backdrop-blur-sm rounded-3xl"
          variants={chartVariants}
        >
          <ChartTitle
            title="Transactions"
            activeState={transactions}
            setActiveState={setTransactions}
          />
          <RFLChart
            data={filteredTransactionsData}
            dataKey="value"
            gradient="#8B8B8B"
            height={150}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Charts;
