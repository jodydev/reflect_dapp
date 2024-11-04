// src/pages/Home.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";
import Logo from "../assets/images/logo.webp";

const mockData = [
  { date: "2024-01", value: 30 },
  { date: "2024-02", value: 35 },
  { date: "2024-03", value: 32 },
  { date: "2024-04", value: 40 },
  { date: "2024-05", value: 45 },
  { date: "2024-06", value: 42 },
];

const Home = () => {
  return (
    <div className="space-y-6">
      <Header />

      {/* Main Content */}
      <div className="flex flex-row space-x-10">
        <div className="flex flex-col w-2/3">
          <h1 className="text-5xl font-bold mb-8">
            Create and trade <span className="text-primary">crypto assets</span>
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-3xl shadow-sm">
              <h3 className="text-gray-600 mb-2">RFL token price</h3>
              <div className="flex items-end gap-3">
                <span className="text-2xl font-bold">$0.0592</span>
                <span className="text-primary">+72%</span>
              </div>
            </div>
            <div className="p-6 bg-primary rounded-3xl shadow-sm">
              <h3 className="text-gray-800 mb-2">RFL assets marketcap</h3>
              <div className="flex items-end gap-3">
                <span className="text-2xl font-bold">$276K</span>
                <span className="text-white">+1.2%</span>
              </div>
            </div>
            <div className="p-6 bg-black text-white rounded-3xl shadow-sm">
              <h3 className="text-gray-400 mb-2">RFL tokens staked</h3>
              <div className="flex items-end gap-3">
                <span className="text-2xl font-bold">$423K RFL</span>
                <span className="text-primary">+0.8%</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="p-6 bg-white rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <img src={Logo} alt="RFL" className="w-6" />
                  <span className="font-bold">RFL</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg bg-gray-100">
                    1H
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-gray-100">
                    1D
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-primary">
                    1M
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-gray-100">
                    6M
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#FFD700"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trending Tokens */}
          <div>
            <h2 className="text-xl font-bold mb-4">Trending tokens</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {["rGOLD", "rSLVR", "rOIL", "rAMZN", "rAPL"].map(
                (token, index) => (
                  <div
                    key={token}
                    className={`p-4 rounded-xl flex items-center gap-3 min-w-[200px] ${
                      index % 2 === 0 ? "bg-primary" : "bg-black text-white"
                    }`}
                  >
                    <span>{token}</span>
                    <span
                      className={
                        index % 2 === 0 ? "text-green-600" : "text-red-500"
                      }
                    >
                      {index % 2 === 0 ? "+10.05%" : "-10.49%"}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* RFL News */}
        <div className="flex flex-col w-1/3 h-full">
          <div className="p-6 bg-white bg-opacity-40 rounded-3xl shadow-sm">
            <h3 className="text-black text-center text-3xl font-semibold mb-2">
              Reflect latest News
            </h3>
            <div className="p-10">
              <p className="text-center">
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
                voluptates in distinctio placeat praesentium. Iusto, aperiam
                nobis dolor incidunt esse, necessitatibus totam recusandae
                corrupti qui nemo fuga non ipsam officiis tempore pariatur ut
                illum vitae minima consectetur minus provident numquam?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
