import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from") || "USD";
    const to = searchParams.get("to") || "PKR";

    console.log("[API] Called with:", { from, to });

    // Free API endpoint
    const apiUrl = `https://open.er-api.com/v6/latest/${from}`;
    console.log("[API] Fetching URL:", apiUrl);

    const res = await axios.get(apiUrl);
    console.log("[API] Response data:", res.data);

    if (!res.data || !res.data.rates || res.data.rates[to] == null) {
      console.error("[API] Invalid response structure:", res.data);
      return NextResponse.json(
        { error: "Invalid response from exchange rate API" },
        { status: 500 },
      );
    }

    const rate = res.data.rates[to];
    console.log("[API] Rate found:", rate);

    return NextResponse.json({ rate });
  } catch (err) {
    console.error("[API] Error details:", err);
    console.error("[API] Error message:", err.message);
    return NextResponse.json(
      { error: "Failed to fetch currency rate" },
      { status: 500 },
    );
  }
}
