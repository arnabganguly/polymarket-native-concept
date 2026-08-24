"use client";

import { useState } from "react";
import { existingPosition, market, selectedOutcome } from "@/lib/market";
import { InfoTooltip } from "@/components/info-tooltip";
import { automationCapabilities } from "@/lib/participate";
import { useExperience } from "@/lib/experience-context";

type Side = "yes" | "no";
type OrderType = "market" | "limit";

export function TradingPanel() {
  const { mode } = useExperience();
  const [side, setSide] = useState<Side>("yes");
  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [amount, setAmount] = useState(20);
  const [limitPrice, setLimitPrice] = useState(75);

  const price = side === "yes" ? market.yesPrice : market.noPrice;
  const shares = orderType === "market" ? +(amount / (price / 100)).toFixed(2) : +(amount / (limitPrice / 100)).toFixed(2);
  const toWin = orderType === "market" ? +(shares - amount).toFixed(2) : +(shares - amount).toFixed(2);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-gray-500">{selectedOutcome.label}</span>
        <div className="flex overflow-hidden rounded-lg border border-gray-200 text-[12px] font-bold">
          <button
            onClick={() => setTab("buy")}
            className={`px-3 py-1 ${tab === "buy" ? "bg-gray-900 text-white" : "text-gray-500"}`}
          >
            Buy
          </button>
          <button
            onClick={() => setTab("sell")}
            className={`px-3 py-1 ${tab === "sell" ? "bg-gray-900 text-white" : "text-gray-500"}`}
          >
            Sell
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setSide("yes")}
          className={`rounded-lg border py-2.5 text-[14px] font-bold transition-colors ${
            side === "yes"
              ? "border-emerald-600 bg-emerald-50 text-emerald-700"
              : "border-gray-200 text-gray-500 hover:border-gray-300"
          }`}
        >
          Yes {market.yesPrice}¢
        </button>
        <button
          onClick={() => setSide("no")}
          className={`rounded-lg border py-2.5 text-[14px] font-bold transition-colors ${
            side === "no"
              ? "border-rose-600 bg-rose-50 text-rose-700"
              : "border-gray-200 text-gray-500 hover:border-gray-300"
          }`}
        >
          No {market.noPrice}¢
        </button>
      </div>

      <div className="flex items-center gap-1 text-[12px] font-semibold text-gray-400">
        <button
          onClick={() => setOrderType("market")}
          className={`rounded-md px-2.5 py-1 ${orderType === "market" ? "bg-gray-100 text-gray-900" : ""}`}
        >
          Market
        </button>
        <button
          onClick={() => setOrderType("limit")}
          className={`rounded-md px-2.5 py-1 ${orderType === "limit" ? "bg-gray-100 text-gray-900" : ""}`}
        >
          Limit
        </button>
      </div>

      {orderType === "limit" && (
        <div>
          <label className="text-[12px] font-medium text-gray-500">Limit price</label>
          <div className="mt-1 flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
            <span className="text-[15px] font-bold text-gray-900">{limitPrice}¢</span>
            <input
              type="range"
              min={1}
              max={99}
              value={limitPrice}
              onChange={(e) => setLimitPrice(+e.target.value)}
              className="w-32 accent-gray-900"
            />
          </div>
        </div>
      )}

      <div>
        <label className="text-[12px] font-medium text-gray-500">Amount</label>
        <div className="mt-1 flex items-center rounded-lg border border-gray-200 px-3 py-2">
          <span className="text-[15px] font-bold text-gray-400">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value || 0)}
            className="w-full bg-transparent pl-1 text-[15px] font-bold text-gray-900 outline-none"
          />
        </div>
        <div className="mt-2 flex gap-1.5">
          {[1, 20, 100].map((v) => (
            <button
              key={v}
              onClick={() => setAmount(v)}
              className="rounded-md bg-gray-50 px-2.5 py-1 text-[12px] font-semibold text-gray-600 hover:bg-gray-100"
            >
              +${v}
            </button>
          ))}
          <button
            onClick={() => setAmount(500)}
            className="rounded-md bg-gray-50 px-2.5 py-1 text-[12px] font-semibold text-gray-600 hover:bg-gray-100"
          >
            Max
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 rounded-lg bg-gray-50 p-3 text-[12px] text-gray-500">
        <div className="flex justify-between">
          <span>Shares</span>
          <span className="font-semibold text-gray-800">{shares}</span>
        </div>
        <div className="flex justify-between">
          <span>To win</span>
          <span className="font-semibold text-emerald-600">${toWin > 0 ? toWin : 0}</span>
        </div>
      </div>

      <button
        className={`rounded-lg py-3 text-[14px] font-bold text-white transition-colors ${
          side === "yes" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
        }`}
      >
        {tab === "buy" ? "Buy" : "Sell"} {side === "yes" ? "Yes" : "No"}
      </button>

      <div className="rounded-lg border border-gray-100 p-3">
        <div className="mb-1.5 flex items-center justify-between text-[12px] font-semibold text-gray-500">
          <span>Your position</span>
          <span className="font-bold text-emerald-600">+{existingPosition.pnlPercent}%</span>
        </div>
        <div className="flex justify-between text-[13px] text-gray-700">
          <span>{existingPosition.shares} shares @ {existingPosition.avgPrice}¢</span>
          <span className="font-semibold">${existingPosition.value}</span>
        </div>
      </div>

      {/* EXISTING: Target sell via limit order */}
      <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-bold text-gray-700">
            {automationCapabilities.existing.label}
            <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-500">
              EXISTING
            </span>
          </div>
          <div className="text-[12px] text-gray-500">{automationCapabilities.existing.description}</div>
        </div>
        <InfoTooltip text={automationCapabilities.existing.detail} />
      </div>

      {mode === "enhanced" && (
        <div className="rounded-lg border p-3" style={{ background: "#F1F7FF", borderColor: "#D7E9FF" }}>
          <div className="flex items-center gap-1.5 text-[11px] font-bold" style={{ color: "#1652F0" }}>
            POLYMARKET+ · SEAMLESS FUNDING
            <InfoTooltip
              accent="#1652F0"
              text="From fiat-adjacent to fiat-native: choose outcome, amount, funding method, done. Reduces friction between understanding a market and acting on it."
            />
          </div>
          <div className="mt-1 text-[12px] text-gray-600">
            Skip the wallet setup. Fund with Apple Pay, Debit, or Bank in seconds.
          </div>
        </div>
      )}
    </div>
  );
}
