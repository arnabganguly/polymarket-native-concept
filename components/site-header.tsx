"use client";

import { Search, ChevronDown, Play } from "lucide-react";
import { useExperience } from "@/lib/experience-context";

export function SiteHeader() {
  const { mode, setMode, startPresentation, presenting } = useExperience();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-4 px-6">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1652F0] text-[13px] font-extrabold text-white">
            P
          </div>
          <span className="text-[17px] font-extrabold tracking-tight text-gray-900">
            Polymarket<span className="text-[#1652F0]">+</span>
          </span>
        </div>

        <nav className="hidden items-center gap-5 text-[14px] font-medium text-gray-500 lg:flex">
          <a className="text-gray-900">Markets</a>
          <a className="hover:text-gray-900">Fed Rates</a>
          <a className="hover:text-gray-900">Elections</a>
          <a className="hover:text-gray-900">Crypto</a>
          <a className="flex items-center gap-1 hover:text-gray-900">
            More <ChevronDown size={14} />
          </a>
        </nav>

        <div className="relative mx-2 hidden max-w-md flex-1 md:block">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search markets"
            readOnly
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-3 text-[13px] text-gray-600 outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <div className="hidden items-center rounded-full border border-gray-200 bg-gray-50 p-0.5 text-[12px] font-semibold sm:flex">
            <button
              onClick={() => setMode("current")}
              className={`rounded-full px-3 py-1 transition-colors ${
                mode === "current" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              CURRENT EXPERIENCE
            </button>
            <button
              onClick={() => setMode("enhanced")}
              className={`rounded-full px-3 py-1 transition-colors ${
                mode === "enhanced" ? "bg-[#1652F0] text-white" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              POLYMARKET+
            </button>
          </div>

          <button
            onClick={startPresentation}
            className="hidden items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-[12px] font-semibold text-gray-600 hover:border-gray-300 hover:text-gray-900 md:flex"
          >
            <Play size={12} /> Present
          </button>

          <div className="hidden items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 text-[13px] font-semibold text-gray-700 sm:flex">
            $1,240.50
          </div>
          <button className="rounded-full bg-[#1652F0] px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-[#1142cc]">
            Deposit
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-200" />
        </div>
      </div>

      {presenting && (
        <div className="border-t border-gray-100 bg-gray-900/95 py-1 text-center text-[11px] font-semibold tracking-wide text-white">
          PRESENTATION MODE ACTIVE
        </div>
      )}
    </header>
  );
}
