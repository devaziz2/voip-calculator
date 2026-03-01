"use client";

import InputField from "@/components/InputField";
import Toggle from "@/components/Toggel";
import { useState } from "react";

export default function MinuteCalculationPage() {
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [mode, setMode] = useState("minute");
  const [seconds, setSeconds] = useState("6");

  const buying = parseFloat(buyingPrice);
  const selling = parseFloat(sellingPrice);
  const recharge = parseFloat(rechargeAmount);
  const sec = parseFloat(seconds);

  const isValid =
    !isNaN(buying) &&
    !isNaN(selling) &&
    !isNaN(recharge) &&
    buying > 0 &&
    selling > 0 &&
    recharge > 0 &&
    (mode === "minute" || (!isNaN(sec) && sec > 0));

  let totalBlocks = 0;
  let totalSeconds = 0;
  let totalMinutes = 0;

  if (isValid) {
    // 🔥 Step 1: How many selling blocks user gets
    totalBlocks = recharge / selling;

    // 🔥 Step 2: Convert blocks → seconds
    totalSeconds = totalBlocks * sec;

    // 🔥 Step 3: Convert seconds → minutes
    totalMinutes = totalSeconds / 60;
  }

  const handleReset = () => {
    setBuyingPrice("");
    setSellingPrice("");
    setRechargeAmount("");
    setSeconds("6");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Minute Calculation</h2>

        <Toggle mode={mode} setMode={setMode} />

        {/* Billing Seconds */}
        <InputField
          label="Billing Seconds (e.g. 6)"
          value={seconds}
          setValue={setSeconds}
        />

        {/* Buying Price */}
        <InputField
          label={
            mode === "minute"
              ? "Buying Price ($ per minute)"
              : "Buying Price ($ per minute)"
          }
          value={buyingPrice}
          setValue={setBuyingPrice}
        />

        {/* Selling Price */}
        <InputField
          label={`Selling Price ($ per ${seconds} sec)`}
          value={sellingPrice}
          setValue={setSellingPrice}
        />

        {/* Recharge */}
        <InputField
          label="Recharge Amount ($)"
          value={rechargeAmount}
          setValue={setRechargeAmount}
        />

        {isValid && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2 text-center">
            <p className="text-lg font-semibold text-emerald-700">
              Total {seconds}s Blocks: {totalBlocks.toFixed(2)}
            </p>

            <p className="text-lg font-semibold text-emerald-700">
              Total Seconds: {totalSeconds.toFixed(2)}
            </p>

            <p className="text-lg font-semibold text-emerald-700">
              Equivalent Minutes: {totalMinutes.toFixed(2)}
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
