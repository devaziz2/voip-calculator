"use client";

import InputField from "@/components/InputField";
import Toggle from "@/components/Toggel";
import { useState } from "react";

export default function BalanceCalculationPage() {
  const [buyingPrice, setBuyingPrice] = useState("");
  const [balancePercent, setBalancePercent] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [clientTopUp, setClientTopUp] = useState("");
  const [mode, setMode] = useState("minute");
  const [seconds, setSeconds] = useState("6");

  const buying = parseFloat(buyingPrice);
  const balance = parseFloat(balancePercent);
  const selling = parseFloat(sellingPrice);
  const topUp = parseFloat(clientTopUp);
  const sec = parseFloat(seconds);

  const isValid =
    !isNaN(buying) &&
    !isNaN(balance) &&
    !isNaN(selling) &&
    !isNaN(topUp) &&
    buying > 0 &&
    selling > 0 &&
    balance > 0 &&
    topUp > 0 &&
    (mode === "minute" || (sec > 0 && !isNaN(sec)));

  // Convert prices based on mode
  const buyingConverted = mode === "minute" ? buying : (buying / 60) * sec;
  const sellingConverted = mode === "minute" ? selling : (selling / 60) * sec;

  // Step 1: Available balance in $
  const availableBalance = isValid ? (balance / 100) * 100 : 0;

  // Step 2: Your total minutes or blocks
  const yourUnits = isValid ? availableBalance / buyingConverted : 0;

  // Step 3: Client units
  const clientUnits = isValid ? topUp / sellingConverted : 0;

  // Step 4: Remaining units
  const remainingUnits = isValid ? yourUnits - clientUnits : 0;

  // Step 5: If seconds mode → convert to total seconds and equivalent minutes
  const totalSeconds = mode === "seconds" ? yourUnits * sec : 0;
  const totalMinutesFromSeconds = mode === "seconds" ? totalSeconds / 60 : 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 text-center">
          Balance Calculation
        </h2>

        {/* Toggle */}
        <Toggle mode={mode} setMode={setMode} />

        {mode === "seconds" && (
          <InputField
            label="Billing Seconds (e.g. 6)"
            value={seconds}
            setValue={setSeconds}
          />
        )}

        {/* Buying Price */}
        <InputField
          label={`Buying Price ($ per ${mode})`}
          value={buyingPrice}
          setValue={setBuyingPrice}
        />

        {/* Balance Percent */}
        <InputField
          label="Your Current Balance (%)"
          value={balancePercent}
          setValue={setBalancePercent}
        />

        {/* Selling Price */}
        <InputField
          label={`Selling Price ($ per ${mode})`}
          value={sellingPrice}
          setValue={setSellingPrice}
        />

        {/* Client Top Up */}
        <InputField
          label="Client Top Up ($)"
          value={clientTopUp}
          setValue={setClientTopUp}
        />

        {/* Results */}
        {isValid && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3 text-sm">
            {mode === "minute" ? (
              <>
                <p className="font-semibold text-slate-700">
                  Your Total Minutes: {yourUnits.toFixed(2)}
                </p>
                <p className="font-semibold text-slate-700">
                  Client Minutes: {clientUnits.toFixed(2)}
                </p>
                <p
                  className={`font-bold text-lg ${remainingUnits < 0 ? "text-red-600" : "text-emerald-700"}`}
                >
                  Remaining Minutes: {remainingUnits.toFixed(2)}
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-slate-700">
                  Your Total {seconds}s Blocks: {yourUnits.toFixed(2)}
                </p>
                <p className="font-semibold text-slate-700">
                  Client {seconds}s Blocks: {clientUnits.toFixed(2)}
                </p>
                <p className="font-semibold text-slate-700">
                  Remaining {seconds}s Blocks: {remainingUnits.toFixed(2)}
                </p>
                <p className="font-semibold text-slate-700">
                  Total Seconds: {totalSeconds.toFixed(2)}
                </p>
                <p className="font-semibold text-slate-700">
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
