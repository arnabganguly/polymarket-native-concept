"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type ExperienceMode = "current" | "enhanced";

export const presentationSteps = [
  { id: "market", label: "Current Market", mode: "current" as ExperienceMode },
  { id: "understand", label: "Understand", mode: "enhanced" as ExperienceMode },
  { id: "trust", label: "Trust", mode: "enhanced" as ExperienceMode },
  { id: "participate", label: "Participate", mode: "enhanced" as ExperienceMode },
  { id: "distribute", label: "Distribute", mode: "enhanced" as ExperienceMode },
  { id: "vision", label: "Vision", mode: "enhanced" as ExperienceMode },
] as const;

interface ExperienceContextValue {
  mode: ExperienceMode;
  setMode: (m: ExperienceMode) => void;
  presenting: boolean;
  step: number;
  startPresentation: () => void;
  stopPresentation: () => void;
  nextStep: () => void;
  prevStep: () => void;
  balance: number;
  addFunds: (amount: number) => void;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ExperienceMode>("current");
  const [presenting, setPresenting] = useState(false);
  const [step, setStep] = useState(0);
  const [balance, setBalance] = useState(1240.5);

  const addFunds = useCallback((amount: number) => {
    setBalance((prev) => +(prev + amount).toFixed(2));
  }, []);

  const goToStep = useCallback((index: number) => {
    const s = presentationSteps[index];
    if (!s) return;
    setStep(index);
    setMode(s.mode);
    if (s.id === "vision") {
      if (typeof window !== "undefined") {
        window.location.href = withBasePath("/vision/");
      }
      return;
    }
    if (typeof window !== "undefined") {
      // Ensure we're on the home page for market/understand/trust/participate/distribute
      if (window.location.pathname.includes("/vision")) {
        window.location.href = withBasePath("/") + `#section-${s.id}`;
        return;
      }
      requestAnimationFrame(() => {
        const el = document.getElementById(`section-${s.id}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  const startPresentation = useCallback(() => {
    setPresenting(true);
    goToStep(0);
  }, [goToStep]);

  const stopPresentation = useCallback(() => setPresenting(false), []);

  const nextStep = useCallback(() => {
    setStep((prev) => {
      const next = Math.min(prev + 1, presentationSteps.length - 1);
      goToStep(next);
      return next;
    });
  }, [goToStep]);

  const prevStep = useCallback(() => {
    setStep((prev) => {
      const next = Math.max(prev - 1, 0);
      goToStep(next);
      return next;
    });
  }, [goToStep]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      presenting,
      step,
      startPresentation,
      stopPresentation,
      nextStep,
      prevStep,
      balance,
      addFunds,
    }),
    [mode, presenting, step, startPresentation, stopPresentation, nextStep, prevStep, balance, addFunds]
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used within ExperienceProvider");
  return ctx;
}

export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path}`;
}
