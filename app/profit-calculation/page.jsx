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
    (mode === "minute" || (sec > 0 && !isNaN(sec)));

  const buyingConverted = mode === "minute" ? buying : (buying / 60) * sec;

  const sellingConverted = mode === "minute" ? selling : (selling / 60) * sec;

  const profit = isValid ? sellingConverted - buyingConverted : 0;

  const profitPercent = isValid ? (profit / buyingConverted) * 100 : 0;

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
          label={`Buying Price ($ per ${mode})`}
          value={buyingPrice}
          setValue={setBuyingPrice}
        />

        <InputField
          label={`Selling Price ($ per ${mode})`}
          value={sellingPrice}
          setValue={setSellingPrice}
        />

        {isValid && (
          <div className="bg-emerald-50 p-4 rounded-xl text-center">
            <p className="font-semibold text-emerald-700">
              Profit per {mode === "minute" ? "minute" : `${seconds} sec`}: $
              {profit.toFixed(6)}
            </p>
            <p className="font-semibold text-emerald-700">
              Profit %: {profitPercent.toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
