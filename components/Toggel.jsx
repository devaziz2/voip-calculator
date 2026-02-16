export default function Toggle({ mode, setMode }) {
  return (
    <div className="flex bg-slate-200 rounded-lg p-1">
      <button
        onClick={() => setMode("minute")}
        className={`flex-1 py-2 rounded-md text-sm font-medium ${
          mode === "minute" ? "bg-emerald-500 text-white" : "text-slate-600"
        }`}
      >
        Per Minute
      </button>
      <button
        onClick={() => setMode("seconds")}
        className={`flex-1 py-2 rounded-md text-sm font-medium ${
          mode === "seconds" ? "bg-emerald-500 text-white" : "text-slate-600"
        }`}
      >
        Per Seconds
      </button>
    </div>
  );
}
