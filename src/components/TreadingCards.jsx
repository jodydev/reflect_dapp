export default function TreadingCards() {
  const tokens = [
    { name: "rGOLD", change: "+10.05%", actualPrice: "$1800" },
    { name: "rSLVR", change: "-10.49%", actualPrice: "$25" },
    { name: "rOIL", change: "+10.05%", actualPrice: "$70" },
    { name: "rAMZN", change: "-10.49%", actualPrice: "$3300" },
    { name: "rAPL", change: "+10.05%", actualPrice: "$150" },
  ];
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Trending tokens</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {tokens.map((token, index) => (
          <div
            key={token.name}
            className="p-4 rounded-xl flex items-center gap-3 min-w-[200px] hover:scale-105 transition duration-500 hover:cursor-pointer"
          >
            <span className="font-bold">{token.name}</span>
            <p
              className={`${
                index % 2 === 0
                  ? "text-white bg-primary"
                  : "text-white bg-black"
              } text-sm px-2 py-2 rounded-lg`}
            >
              {token.actualPrice}{" "}
              <span className="text-white">{token.change}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
