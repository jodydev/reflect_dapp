import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatValue } from "../../utils/formatValue";

const RFLChart = ({ data, height }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        {/* Tooltip */}
        <XAxis dataKey="name" tickLine={true} axisLine={true} 
          interval="preserveStartEnd" 
          tick={{ fill: "#000", fontSize: "12px", }}
        />
        <Tooltip
          formatter={(value) => formatValue(value)}
          labelFormatter={(label) => `Timeframe: ${label}`}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            color: "#000000",
            fontSize: "14px",
          }}
        />

        {/* Gradiente di riempimento */}
        <defs>
          <linearGradient id="black-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#000000" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Area con riempimento nero gradiente */}
        <Area
          type="monotone"
          dataKey="value"
          stroke="#FF9900"
          fill="url(#black-gradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RFLChart;

// import React from "react";
// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// const RFLChart = ({ data, dataKey, gradient, height, prefix = "", suffix = "" }) => {

//   return (
//     <div style={{ height: `${height}px`, position: "relative" }}>
//         <ResponsiveContainer>
//           <LineChart data={data}>
//             <defs>
//               <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor={gradient} stopOpacity={0.8} />
//                 <stop offset="100%" stopColor={gradient} stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip
//               formatter={(value) => `${prefix}${value}${suffix}`}
//               contentStyle={{
//                 backgroundColor: "rgba(255, 255, 255, 0.8)",
//                 backdropFilter: "blur(10px)",
//                 border: "1px solid rgba(255, 255, 255, 0.1)",
//                 borderRadius: "8px",
//                 color: "#000000",
//                 fontSize: "14px",
//               }}
//             />
//             <Line
//               type="monotone"
//               dataKey={dataKey}
//               stroke={`url(#chartGradient)`}
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//     </div>
//   );
// };

// export default RFLChart;

// Calcola il valore minimo e massimo nei dati
// const minValue = Math.min(...data.map((item) => item.value));
// const maxValue = Math.max(...data.map((item) => item.value));

// data = [
//   {
//     name: "5m",
//     value: 10,
//   },
//   {
//     name: "1h",
//     value: 20,
//   },
//   {
//     name: "6h",
//     value: 30,
//   },
//   {
//     name: "24h",
//     value: 40,
//   },
// ]

{
  /* Asse X */
}
{
  /* <XAxis
          dataKey="name"
          tickLine={true}
          axisLine={true}
          interval="preserveStartEnd" 
          tick={{ fill: "#000" }}
        /> */
}
{
  /* Asse Y configurato per gestire valori negativi */
}
{
  /* <YAxis
          domain={[minValue, maxValue]}
          tickLine={true}
          axisLine={true}
        /> */
}
