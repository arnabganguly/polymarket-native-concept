// TRUST — Integrity Hardening (proposed)
// Communicates confidence in the *market's structural health*, not whether
// the outcome will be correct. That distinction is intentional and must be
// preserved in all copy. Every score below is 0-100; colors and labels are
// derived from the score everywhere it's shown, so a high number always
// reads as green/trusted and a low number always reads as amber/red —
// never the reverse.

export interface TrustFactor {
  id: string;
  label: string;
  score: number; // 0-100
  summary: string; // short, adjacent explanation (one line)
  detail: string; // fuller explanation shown in the info tooltip
}

export const trustFactors: TrustFactor[] = [
  {
    id: "liquidity",
    label: "Liquidity",
    score: 82,
    summary: "Enough depth to trade without moving the price much.",
    detail:
      "Liquidity measures how much money sits in the order book at prices close to the current one. Deeper liquidity means trades — including larger ones — execute closer to the displayed price.",
  },
  {
    id: "breadth",
    label: "Breadth of participation",
    score: 78,
    summary: "Many independent traders are active, not just a few.",
    detail:
      "Breadth looks at how many distinct traders are contributing to this market's volume. Wider participation makes the price harder for any single trader to move on their own.",
  },
  {
    id: "concentration",
    label: "Concentration",
    score: 45,
    summary: "A handful of holders account for a notable share of positions.",
    detail:
      "Concentration measures how much of the total position is held by the largest few accounts. Higher concentration means the price is more exposed to the decisions of a small number of traders.",
  },
  {
    id: "spread",
    label: "Spread",
    score: 85,
    summary: "Buy and sell prices sit close together.",
    detail:
      "Spread is the gap between the best available buy and sell price. A tighter spread means prices are efficient and it costs less to enter or exit a position.",
  },
  {
    id: "resolution",
    label: "Resolution clarity",
    score: 90,
    summary: "The rules for how this market settles are clear.",
    detail:
      "Resolution clarity reflects how unambiguous the market's settlement criteria are. Clear rules reduce the chance of disputes about the final outcome.",
  },
];

export const trustSignal = {
  score: Math.round(trustFactors.reduce((sum, f) => sum + f.score, 0) / trustFactors.length),
  summary: "Backed by broad participation and healthy market depth.",
  infoTooltip:
    "This reflects characteristics of the market producing the probability, such as liquidity, participation and concentration. It does not predict whether the market will ultimately resolve correctly.",
};

export type TrustBand = "high" | "moderate" | "low";

export function trustBand(score: number): TrustBand {
  if (score >= 70) return "high";
  if (score >= 40) return "moderate";
  return "low";
}

export const trustBandCopy: Record<TrustBand, { label: string }> = {
  high: { label: "High Confidence" },
  moderate: { label: "Moderate Confidence" },
  low: { label: "Low Confidence" },
};
