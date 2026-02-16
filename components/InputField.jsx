export default function InputField({ label, value, setValue }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type="number"
        step="0.0001"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
}
