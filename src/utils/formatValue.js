export const formatValue = (value) => {
    if (typeof value === "number") {
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return "N/A";
  };
  