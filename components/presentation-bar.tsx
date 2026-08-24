"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { presentationSteps, useExperience } from "@/lib/experience-context";

export function PresentationBar() {
  const { presenting, step, nextStep, prevStep, stopPresentation } = useExperience();
  if (!presenting) return null;

  const current = presentationSteps[step];

  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-xl">
      <button
        onClick={prevStep}
        disabled={step === 0}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 disabled:opacity-30"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex items-center gap-2 px-1">
        {presentationSteps.map((s, i) => (
          <span
            key={s.id}
            className={`h-1.5 rounded-full transition-all ${
              i === step ? "w-5 bg-gray-900" : "w-1.5 bg-gray-200"
            }`}
          />
        ))}
      </div>

      <span className="min-w-[110px] text-center text-[12.5px] font-bold text-gray-800">{current.label}</span>

      <button
        onClick={nextStep}
        disabled={step === presentationSteps.length - 1}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-30"
      >
        <ChevronRight size={16} />
      </button>

      <button
        onClick={stopPresentation}
        className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
      >
        <X size={15} />
      </button>
    </div>
  );
}
