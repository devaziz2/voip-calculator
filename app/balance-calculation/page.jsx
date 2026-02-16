"use client";

import { useState } from "react";

export default function BalanceCalculationPage() {
  const [buyingPrice, setBuyingPrice] = useState("");
  const [balancePercent, setBalancePercent] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [clientTopUp, setClientTopUp] = useState("");

  const buying = parseFloat(buyingPrice);
  const balance = parseFloat(balancePercent);
  const selling = parseFloat(sellingPrice);
  const topUp = parseFloat(clientTopUp);

  const isValid =
    !isNaN(buying) &&
    !isNaN(balance) &&
    !isNaN(selling) &&
    !isNaN(topUp) &&
    buying > 0 &&
    selling > 0 &&
    balance > 0 &&
    topUp > 0;

  // Step 1: Your available balance in $
  const availableBalance = isValid ? (balance / 100) * 100 : 0;

  // Step 2: Your total minutes
  const yourMinutes = isValid ? availableBalance / buying : 0;

  // Step 3: Client minutes
  const clientMinutes = isValid ? topUp / selling : 0;

  // Step 4: Remaining minutes
  const remainingMinutes = isValid ? yourMinutes - clientMinutes : 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 text-center">
          Balance Calculation
        </h2>

        {/* Buying Price */}
        <InputField
          label="Buying Price ($ per minute)"
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
          label="Selling Price ($ per minute)"
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
            <p className="font-semibold text-slate-700">
              Your Total Minutes: {yourMinutes.toFixed(2)}
            </p>

            <p className="font-semibold text-slate-700">
              Client Minutes: {clientMinutes.toFixed(2)}
            </p>

            <p
              className={`font-bold text-lg ${
                remainingMinutes < 0 ? "text-red-600" : "text-emerald-700"
              }`}
            >
              Remaining Minutes: {remainingMinutes.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InputField({ label, value, setValue }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-2">
        {label}
      </label>
      <input
        type="number"
        step="0.0001"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        placeholder="Enter value"
      />
    </div>
  );
}
