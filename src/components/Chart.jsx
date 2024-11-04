import Logo from "../assets/images/logo.webp";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart() {

  const mockData = [
    { date: "2024-01", value: 30 },
    { date: "2024-02", value: 35 },
    { date: "2024-03", value: 32 },
    { date: "2024-04", value: 40 },
    { date: "2024-05", value: 45 },
    { date: "2024-06", value: 42 },
  ];

  return (
     <div className="grid grid-cols-1 gap-6 mb-8">
     <div className="p-6 bg-white/20 shadow-sm backdrop-blur-sm border border-white/20 rounded-3xl">
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
  )
};