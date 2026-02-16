"use client";

import InputField from "@/components/InputField";
import Toggle from "@/components/Toggel";
import { useState } from "react";

export default function MinuteCalculationPage() {
  const [buyingPrice, setBuyingPrice] = useState("");
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [mode, setMode] = useState("minute");
  const [seconds, setSeconds] = useState("6");

  const buying = parseFloat(buyingPrice);
  const recharge = parseFloat(rechargeAmount);
  const sec = parseFloat(seconds);

  const isValid =
    !isNaN(buying) &&
    !isNaN(recharge) &&
    buying > 0 &&
    recharge > 0 &&
    (mode === "minute" || (sec > 0 && !isNaN(sec)));

  // Convert price depending on mode
  const pricePerUnit = mode === "minute" ? buying : (buying / 60) * sec;

  const totalUnits = isValid ? recharge / pricePerUnit : 0;

  // If seconds mode → convert blocks to total seconds + minutes
  const totalSeconds = mode === "seconds" ? totalUnits * sec : 0;

  const totalMinutesFromSeconds = mode === "seconds" ? totalSeconds / 60 : 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Minute Calculation</h2>

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
          label="Recharge Amount ($)"
          value={rechargeAmount}
          setValue={setRechargeAmount}
        />

        {isValid && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2 text-center">
            {mode === "minute" ? (
              <p className="text-lg font-semibold text-emerald-700">
                Total Minutes: {totalUnits.toFixed(2)}
              </p>
            ) : (
              <>
                <p className="text-lg font-semibold text-emerald-700">
                  Total {seconds}s Blocks: {totalUnits.toFixed(2)}
                </p>
                <p className="text-lg font-semibold text-emerald-700">
                  Total Seconds: {totalSeconds.toFixed(2)}
                </p>
                <p className="text-lg font-semibold text-emerald-700">
                  Equivalent Minutes: {totalMinutesFromSeconds.toFixed(2)}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
