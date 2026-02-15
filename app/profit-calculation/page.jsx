"use client";

import { useState } from "react";

export default function ProfitCalculationPage() {
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const buying = parseFloat(buyingPrice);
  const selling = parseFloat(sellingPrice);

  const isValid =
    !isNaN(buying) && !isNaN(selling) && buying > 0 && selling > 0;

  const profit = isValid ? selling - buying : 0;
  const profitPercent = isValid ? ((selling - buying) / buying) * 100 : 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 text-center">
          Profit Calculation
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

        {/* Selling Price */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Selling Price ($ per minute)
          </label>
          <input
            type="number"
            step="0.0001"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter selling price"
          />
        </div>

        {/* Results */}
        {isValid && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2 text-center">
            <p className="text-lg font-semibold text-emerald-700">
              Profit per minute: ${profit.toFixed(6)}
            </p>
            <p className="text-lg font-semibold text-emerald-700">
              Profit Percentage: {profitPercent.toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
