// TRUST — Integrity Hardening (proposed)
// Communicates confidence in the *market's structural health*, not whether
// the outcome will be correct. That distinction is intentional and must be
// preserved in all copy.

export interface TrustFactor {
  label: string;
  rating: "Strong" | "Moderate" | "Caution";
}

export const trustSignal = {
  score: 62,
  label: "HIGH CONFIDENCE",
  summary: "Backed by broad participation and healthy market depth.",
  infoTooltip:
    "This reflects characteristics of the market producing the probability, such as liquidity, participation and concentration. It does not predict whether the market will ultimately resolve correctly.",
};

export const trustFactors: TrustFactor[] = [
  { label: "Liquidity", rating: "Strong" },
  { label: "Breadth of participation", rating: "Strong" },
  { label: "Concentration", rating: "Moderate" },
  { label: "Spread", rating: "Strong" },
  { label: "Resolution clarity", rating: "Strong" },
];
