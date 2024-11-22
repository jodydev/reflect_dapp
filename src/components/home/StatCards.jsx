import { getTokenData } from "../../hooks/getTokenData";
import { motion } from "framer-motion";

export default function StatCards() {
  const tokenAddress = "0x6e2c81b6c2C0e02360F00a0dA694e489acB0b05e";
  const { data, loading, error } = getTokenData(tokenAddress);

  const defaultCardData = [
    {
      title: "RFL token price",
      value: "Loading...",
      change: "",
      bgColor: "bg-white/20",
      textColor: "text-black",
      valueColor: "text-primary",
      borderColor: "border-white/20",
    },
    {
      title: "RFL assets marketcap",
      value: "Loading...",
      change: "",
      bgColor: "bg-primary",
      textColor: "text-black",
      valueColor: "text-white",
    },
    {
      title: "RFL tokens staked",
      value: "Loading...",
      change: "",
      bgColor: "bg-black",
      textColor: "text-white",
      valueColor: "text-primary",
    },
  ];

  const cardData = data
    ? [
        {
          title: "RFL token price",
          value: `$${data.price}`,
          change: `${data.priceChange.h24}%`,
          bgColor: "bg-white/20",
          textColor: "text-black",
          valueColor: "text-primary",
        },
        {
          title: "RFL assets marketcap",
          value: `$${data.marketCap}`,
          change: "",
          bgColor: "bg-primary",
          textColor: "text-black",
          valueColor: "text-white",
        },
        {
          title: "RFL tokens staked",
          value: `${data.tokensStaked} RFL`,
          change: "",
          bgColor: "bg-black",
          textColor: "text-white",
          valueColor: "text-primary",
        },
      ]
    : defaultCardData;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {cardData.map((card, index) => (
        <motion.div
          key={index}
          className={`px-6 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 hover:cursor-pointer ${card.bgColor} ${card.borderColor || ""}`}
          variants={cardVariants}
        >
          <h3 className={`mb-2 ${card.textColor}`}>{card.title}</h3>
          <div className="flex items-end gap-3">
            <span
              className={`text-2xl font-bold ${index === 2 ? "text-white" : "text-black"}`}
            >
              {card.value}
            </span>
            <span className={`${card.valueColor} mb-1`}>{card.change}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
