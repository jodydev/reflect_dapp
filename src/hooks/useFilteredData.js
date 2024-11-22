import { useMemo } from "react";

export const useFilteredData = (data, dataType, timeframe) => {
  const filteredData = useMemo(() => {
    if (!data) return [];
    const dataMapping = {
      priceChange: [
        { name: "5m", value: parseFloat(data?.priceChange.m5) },
        { name: "1h", value: parseFloat(data?.priceChange.h1) },
        { name: "6h", value: parseFloat(data?.priceChange.h6) },
        { name: "24h", value: parseFloat(data?.priceChange.h24) },
      ],
      volume: [
        { name: "5m", value: parseFloat(data?.volume.m5) },
        { name: "1h", value: parseFloat(data?.volume.h1) },
        { name: "6h", value: parseFloat(data?.volume.h6) },
        { name: "24h", value: parseFloat(data?.volume.h24) },
      ],
      transactions: [
        {
          name: "5m",
          value: parseFloat(data?.txns.m5.sells) + parseFloat(data?.txns.m5.buys),
        },
        {
          name: "1h",
          value: parseFloat(data?.txns.h1.sells) + parseFloat(data?.txns.h1.buys),
        },
        {
          name: "6h",
          value: parseFloat(data?.txns.h6.sells) + parseFloat(data?.txns.h6.buys),
        },
        {
          name: "24h",
          value: parseFloat(data?.txns.h24.sells) + parseFloat(data?.txns.h24.buys),
        },
      ],
    };

    const selectedData = dataMapping[dataType] || [];
    switch (timeframe) {
      case "5m":
        return selectedData.slice(0, 2);
      case "1h":
        return selectedData.slice(0, 3);
      case "6h":
        return selectedData.slice(0, 4);
      case "24h":
        return selectedData;
      default:
        return selectedData;
    }
  }, [data, dataType, timeframe]);

  return filteredData;
};
