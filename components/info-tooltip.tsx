"use client";

import { Info } from "lucide-react";
import { useState } from "react";

export function InfoTooltip({ text, accent = "#6B7280" }: { text: string; accent?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex items-center align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="More information"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        <Info size={14} strokeWidth={2} />
      </button>
      {open && (
        <span
          className="absolute left-1/2 top-6 z-50 w-64 -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-3 text-[12px] leading-snug text-gray-700 shadow-lg"
          style={{ borderTopColor: accent, borderTopWidth: 2 }}
        >
          {text}
        </span>
      )}
    </span>
  );
}
