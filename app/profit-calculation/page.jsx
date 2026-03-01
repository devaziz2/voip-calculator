"use client";

import InputField from "@/components/InputField";
import Toggle from "@/components/Toggel";
import { useState } from "react";

export default function ProfitCalculationPage() {
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [mode, setMode] = useState("minute");
  const [seconds, setSeconds] = useState("6");

  const buying = parseFloat(buyingPrice);
  const selling = parseFloat(sellingPrice);
  const sec = parseFloat(seconds);

  const isValid =
    !isNaN(buying) &&
    !isNaN(selling) &&
    buying > 0 &&
    selling > 0 &&
    (mode === "minute" || (!isNaN(sec) && sec > 0));

  let profit = 0;
  let profitPercent = 0;

  if (isValid) {
    if (mode === "minute") {
      // 🔹 Normal Per Minute Mode
      profit = selling - buying;
      profitPercent = selling > 0 ? (profit / selling) * 100 : 0;
    } else {
      // 🔥 Telecom Seconds Mode
      // Buying is per minute
      const costPerMinute = buying;

      // Selling is per billing seconds (e.g. 6 sec)
      const revenuePerMinute = selling * (60 / sec);

      profit = revenuePerMinute - costPerMinute;

      profitPercent =
        revenuePerMinute > 0 ? (profit / revenuePerMinute) * 100 : 0;
    }
  }

  const handleReset = () => {
    setBuyingPrice("");
    setSellingPrice("");
    setSeconds("6");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Profit Calculation</h2>

        {/* Toggle */}
        <Toggle mode={mode} setMode={setMode} />

        {mode === "seconds" && (
          <InputField
            label="Billing Seconds (e.g. 6)"
            value={seconds}
            setValue={setSeconds}
          />
        )}

        <InputField
          label={
            mode === "minute"
              ? "Buying Price ($ per minute)"
              : "Buying Price ($ per minute)"
          }
          value={buyingPrice}
          setValue={setBuyingPrice}
        />

        <InputField
          label={
            mode === "minute"
              ? "Selling Price ($ per minute)"
              : `Selling Price ($ per ${seconds} sec)`
          }
          value={sellingPrice}
          setValue={setSellingPrice}
        />

        {isValid && (
          <div className="bg-emerald-50 p-4 rounded-xl text-center space-y-2">
            <p className="font-semibold text-emerald-700">
              Profit per minute: ${profit.toFixed(6)}
            </p>

            <p className="font-semibold text-emerald-700">
              Profit Margin: {profitPercent.toFixed(2)}%
            </p>

            <button
              onClick={handleReset}
              className="mt-3 bg-gray-200 hover:bg-gray-300 transition py-2 px-4 rounded-lg text-sm font-medium"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
