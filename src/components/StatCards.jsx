const cardData = [
  {
    title: "RFL token price",
    value: "$0.0592",
    change: "+72%",
    bgColor: "bg-white/20",
    textColor: "text-black",
    valueColor: "text-primary",
    borderColor: "border-white/20",
  },
  {
    title: "RFL assets marketcap",
    value: "$276K",
    change: "+1.2%",
    bgColor: "bg-primary",
    textColor: "text-black",
    valueColor: "text-white",
  },
  {
    title: "RFL tokens staked",
    value: "$423K RFL",
    change: "+0.8%",
    bgColor: "bg-black",
    textColor: "text-white",
    valueColor: "text-primary",
  },
];

export default function StatCards() {
  return (
    <div className="p-2">
      <h1 className="text-4xl font-bold mb-8">
        Create and trade <span className="text-primary">crypto assets</span>
      </h1>
      <div className="grid grid-cols-3 gap-6 mb-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-3xl shadow-sm hover:scale-105 transition duration-500 hover:cursor-pointer ${
              card.bgColor
            } ${card.borderColor || ""}`}
          >
            <h3 className={`mb-2 ${card.textColor}`}>{card.title}</h3>
            <div className="flex items-end gap-3">
              <span
                className={`${
                  index === 2 ? "text-white" : "text-black"
                } text-2xl font-bold`}
              >
                {card.value}
              </span>
              <span className={card.valueColor}>{card.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
