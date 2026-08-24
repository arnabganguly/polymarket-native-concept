"use client";

import { outcomes } from "@/lib/market";

export function OutcomesPanel() {
  return (
    <div className="flex flex-col divide-y divide-gray-100 rounded-xl border border-gray-200">
      {outcomes.map((o) => (
        <div
          key={o.id}
          className={`flex items-center justify-between gap-3 px-4 py-3 ${
            o.selected ? "bg-blue-50/40" : ""
          }`}
        >
          <div className="flex flex-1 items-center gap-3">
            <span className={`text-[14px] font-semibold ${o.selected ? "text-gray-900" : "text-gray-700"}`}>
              {o.label}
            </span>
            {o.selected && (
              <span className="rounded-full bg-[#1652F0]/10 px-2 py-0.5 text-[10px] font-bold text-[#1652F0]">
                SELECTED
              </span>
            )}
          </div>
          <div className="hidden w-32 items-center sm:flex">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-900"
                style={{ width: `${o.probability}%` }}
              />
            </div>
          </div>
          <span className="w-10 text-right text-[14px] font-bold text-gray-900">{o.probability}%</span>
          <div className="flex gap-1.5">
            <button className="rounded-md bg-emerald-50 px-2.5 py-1 text-[12px] font-bold text-emerald-700 hover:bg-emerald-100">
              Yes
            </button>
            <button className="rounded-md bg-rose-50 px-2.5 py-1 text-[12px] font-bold text-rose-700 hover:bg-rose-100">
              No
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
