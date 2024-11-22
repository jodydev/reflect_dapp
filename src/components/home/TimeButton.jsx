export default function TimeButton({ active, onClick, children }) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`px-3 py-1 text-xs transition-colors rounded-lg ${
          active
            ? "bg-amber-400 text-white rounded-lg "
            : "bg-white/30 hover:bg-white/20 text-dark"
        }`}
      >
        {children}
      </button>
    </>
  );
}
