// Deterministic, fully mocked demo data for a fictional Federal Reserve
// rate decision market. Nothing here is a live probability or real market
// signal — see DEMO MARKET · FICTIONAL DATA labels wherever this is shown.

export type OutcomeId = "cut50" | "cut25" | "nochange" | "raise";

export interface Outcome {
  id: OutcomeId;
  label: string;
  probability: number; // 0-100
  selected?: boolean;
}

export const outcomes: Outcome[] = [
  { id: "cut50", label: "Cut rates by 50+ bps", probability: 8 },
  { id: "cut25", label: "Cut rates by 25 bps", probability: 57, selected: true },
  { id: "nochange", label: "No change", probability: 32 },
  { id: "raise", label: "Raise rates", probability: 3 },
];

export const selectedOutcome = outcomes.find((o) => o.selected)!;

export const market = {
  category: "Economics",
  subcategory: "Fed Rates",
  title: "What will the Fed do at its next meeting?",
  volume: "$4.2M",
  endDate: "Dec 17, 2026",
  yesPrice: 58, // cents
  noPrice: 44, // cents
};

// Probability history for the selected outcome (Cut rates by 25 bps),
// used to draw the historical chart. Values are percentages 0-100.
export const probabilityHistory: { t: string; p: number }[] = [
  { t: "Aug 1", p: 34 },
  { t: "Aug 4", p: 36 },
  { t: "Aug 7", p: 35 },
  { t: "Aug 10", p: 38 },
  { t: "Aug 13", p: 41 },
  { t: "Aug 16", p: 40 },
  { t: "Aug 19", p: 43 },
  { t: "Aug 20", p: 44 },
  { t: "Aug 21", p: 49 }, // employment data release
  { t: "Aug 22", p: 53 },
  { t: "Aug 23", p: 55 },
  { t: "Aug 24", p: 57 },
];

export const existingPosition = {
  outcome: "Cut rates by 25 bps",
  shares: 120,
  avgPrice: 50, // cents
  currentPrice: 58, // cents
  value: 69.6,
  pnlPercent: 16,
};
