"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const currencies = ["USD", "PKR", "ZAR"];

export default function CurrencyConverterPage() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getRate = async (from, to) => {
    try {
      const res = await axios.get(`/api/convert?from=${from}&to=${to}`);
      return res.data.rate;
    } catch (err) {
      console.error("Failed to fetch rate:", err);
      return null;
    }
  };

  // Update "toAmount" when "fromAmount" changes
  const handleFromChange = async (value) => {
    setFromAmount(value);
    if (!value || isNaN(value)) {
      setToAmount("");
      return;
    }

    setIsLoading(true);
    const rate = await getRate(fromCurrency, toCurrency);
    if (rate != null) setToAmount((parseFloat(value) * rate).toFixed(2));
    setIsLoading(false);
  };

  // Update "fromAmount" when "toAmount" changes
  const handleToChange = async (value) => {
    setToAmount(value);
    if (!value || isNaN(value)) {
      setFromAmount("");
      return;
    }

    setIsLoading(true);
    const rate = await getRate(fromCurrency, toCurrency);
    if (rate != null) setFromAmount((parseFloat(value) / rate).toFixed(2));
    setIsLoading(false);
  };

  // Recalculate whenever currencies change
  useEffect(() => {
    if (!fromAmount || isNaN(fromAmount)) return;

    let canceled = false;

    const fetchAndUpdate = async () => {
      setIsLoading(true);
      const rate = await getRate(fromCurrency, toCurrency);
      if (!canceled && rate != null) {
        setToAmount((parseFloat(fromAmount) * rate).toFixed(2));
      }
      setIsLoading(false);
    };

    fetchAndUpdate();

    return () => {
      canceled = true; // cancel update if component unmounts or deps change
    };
  }, [fromCurrency, toCurrency]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Currency Converter
        </h2>

        {/* From input */}
        <div className="flex gap-2 items-center">
          <input
            type="number"
            step="0.01"
            value={fromAmount}
            onChange={(e) => handleFromChange(e.target.value)}
            className="flex-1 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="From amount"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        {/* To input */}
        <div className="flex gap-2 items-center">
          <input
            type="number"
            step="0.01"
            value={toAmount}
            onChange={(e) => handleToChange(e.target.value)}
            className="flex-1 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="To amount"
          />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {isLoading && (
          <p className="text-center text-slate-600 animate-pulse">
            Converting...
          </p>
        )}
      </div>
    </div>
  );
}
