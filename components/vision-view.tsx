"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { pillars } from "@/lib/pillars";
import { withBasePath } from "@/lib/experience-context";
import { PresentationBar } from "@/components/presentation-bar";

const loop = [pillars.understand, pillars.trust, pillars.participate, pillars.distribute];

export function VisionView() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-[1000px] flex-col items-center justify-center gap-8 px-6 py-16">
      <Link
        href={withBasePath("/")}
        className="flex items-center gap-1.5 self-start text-[13px] font-semibold text-gray-500 hover:text-gray-800"
      >
        <ArrowLeft size={15} /> Back to market
      </Link>

      <div className="text-center">
        <div className="text-[12px] font-bold tracking-widest text-gray-400">STRATEGY</div>
        <h1 className="mt-1 text-[26px] font-extrabold text-gray-900">Each bet reinforces the next.</h1>
      </div>

      <div className="relative flex h-[420px] w-full max-w-[560px] items-center justify-center">
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
          <circle cx="200" cy="200" r="150" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="6 8" />
        </svg>

        <div className="z-10 flex h-36 w-36 flex-col items-center justify-center rounded-full bg-gray-900 text-center text-white shadow-xl">
          <span className="text-[11px] font-bold tracking-wide text-gray-300">MORE</span>
          <span className="text-[16px] font-extrabold">USERS</span>
          <span className="mt-1 text-[9px] text-gray-400">deeper liquidity</span>
          <span className="text-[9px] text-gray-400">stronger signals</span>
        </div>

        {loop.map((p, i) => {
          const angle = (i / loop.length) * 2 * Math.PI - Math.PI / 2;
          const r = 170;
          const x = 200 + r * Math.cos(angle);
          const y = 200 + r * Math.sin(angle);
          return (
            <div
              key={p.id}
              className="absolute flex h-20 w-20 flex-col items-center justify-center rounded-full border text-center shadow-sm"
              style={{
                left: x - 40,
                top: y - 40,
                background: p.wash,
                borderColor: p.border,
                color: p.accent,
              }}
            >
              <span className="text-[11px] font-extrabold">{p.label}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-[13px] font-semibold text-gray-400">
        <span>Understand</span>
        <span>→</span>
        <span>Trust</span>
        <span>→</span>
        <span>Participate</span>
        <span>→</span>
        <span>Distribute</span>
        <span>→</span>
        <span className="text-gray-800">back into the network</span>
      </div>

      <div className="rounded-full bg-gray-900 px-5 py-2.5 text-[13px] font-extrabold tracking-wide text-white">
        GOAL: 10X MONTHLY ACTIVE PARTICIPANTS
      </div>
      <div className="max-w-md text-center text-[12px] text-gray-400">
        Monthly Active Participants: unique wallets or accounts that place a funded trade or take a qualified
        intelligence action — a query, follow, or embed click-through. This is a target, not an achieved result.
      </div>

      <PresentationBar />
    </div>
  );
}
