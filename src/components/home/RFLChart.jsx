import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatValue = (value) => `${value}%`;

const transformData = (data) =>
  data.map((item) => ({
    ...item,
    value: parseFloat(item.value),
  }));

const RFLChart = ({ data, height }) => {
  const transformedData = transformData(data);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={transformedData}>
        {/* Asse X */}
        <XAxis
          dataKey="name"
          tickLine
          axisLine
          interval="preserveStartEnd"
          tick={{
            fill: "#000",
            fontSize: "12px",
          }}
        />

        {/* Asse Y */}
        <YAxis
          tickFormatter={(value) => `${value}%`}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#000", fontSize: "12px" }}
        />

        {/* Tooltip */}
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

        {/* Area */}
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
