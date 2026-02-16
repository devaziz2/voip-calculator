"use client";

import { useState } from "react";

export default function MinuteCalculationPage() {
  const [buyingPrice, setBuyingPrice] = useState("");
  const [rechargeAmount, setRechargeAmount] = useState("");

  const buying = parseFloat(buyingPrice);
  const recharge = parseFloat(rechargeAmount);

  const isValid =
    !isNaN(buying) && !isNaN(recharge) && buying > 0 && recharge > 0;

  const minutes = isValid ? recharge / buying : 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 text-center">
          Minute Calculation
        </h2>

        {/* Buying Price */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Buying Price ($ per minute)
          </label>
          <input
            type="number"
            step="0.0001"
            value={buyingPrice}
            onChange={(e) => setBuyingPrice(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter buying price"
          />
        </div>

        {/* Recharge Amount */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Recharge Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={rechargeAmount}
            onChange={(e) => setRechargeAmount(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter recharge amount"
          />
        </div>

        {/* Result */}
        {isValid && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2 text-center">
            <p className="text-lg font-semibold text-emerald-700">
              Total Minutes: {minutes.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
