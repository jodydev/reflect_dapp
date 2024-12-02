import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RFLChart = ({ data, height }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        {/* X-Axis */}
        <XAxis
          dataKey="name"
          tickLine={true}
          axisLine={true}
          interval="preserveStartEnd"
          tick={{
            fill: "#000",
            fontSize: "10px",
          }}
        />

        {/* Y-Axis con percentuali */}
        <YAxis
          tickFormatter={(value) => `${value.toFixed(0)}%`}
          tick={{ fill: "#000", fontSize: "10px" }}
          axisLine={true}
          tickLine={true}
        />

          <Tooltip
            formatter={(value) => `${value > 0 ? '+' : ''}${value.toFixed(0)}%`}
            labelFormatter={(label) => `Timeframe: ${label}`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              color: "#000",
              fontSize: "14px",
            }}
          />

          {/* Gradiente di riempimento */}
        <defs>
          <linearGradient id="black-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#000000" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="orange-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF9900" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#FF9900" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Area principale */}
        <Area
          type="monotone"
          dataKey="value"
          stroke="#FF9900"
          fill="url(#black-gradient)"
          strokeWidth={1}
        />

        {/* Area per il volume */}
        <Area
          type="monotone"
          dataKey="volume"
          stroke="#0000FF"
          fill="url(#orange-gradient)"
          strokeWidth={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RFLChart;




