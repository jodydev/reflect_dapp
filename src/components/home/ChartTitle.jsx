import Logo from "../../assets/images/logo.webp";
import TimeButton from "./TimeButton";

export default function ChartTitle({ title, activeState, setActiveState }) {
  const currentDate = new Date().toLocaleDateString("it", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString("it", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex flex-col items-start gap-2">
        <div className="flex flex-row items-start gap-2">
          <img src={Logo} alt="RFL" className="w-4 h-6" />
          <span className="font-bold text-dark text-xl">{title}</span>
        </div>
        <span className="font-bold text-dark text-xs text-nowrap">{`${currentDate} ${currentTime}`}</span>
      </div>

      <div className="flex gap-1">
        {["5m", "1h", "6h", "24h"].map((time) => (
          <TimeButton
            key={time}
            active={activeState === time}
            onClick={() => setActiveState(time)}
          >
            {time}
          </TimeButton>
        ))}
      </div>
    </div>
  );
}
