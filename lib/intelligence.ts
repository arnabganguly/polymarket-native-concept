// UNDERSTAND — Market Intelligence (proposed)
// Lightweight, integrated context. Never claims to predict the outcome.

// Chart-native market events. Each event ties a real-world happening to a
// specific point on the probability chart (matched by date to a point in
// market.probabilityHistory). Language is intentionally hedged — the market
// moved around these events, not because of them in a proven sense.

export interface MarketEvent {
  id: string;
  date: string; // matches a `t` value in probabilityHistory
  headline: string;
  description: string;
  fromProbability: number;
  toProbability: number;
  whyItMattered: string;
  source: string;
}

export const marketEvents: MarketEvent[] = [
  {
    id: "cpi",
    date: "Aug 12",
    headline: "CPI data released",
    description:
      "August CPI came in cooler than expected, with core inflation easing to its lowest year-over-year pace in over a year.",
    fromProbability: 38,
    toProbability: 45,
    whyItMattered:
      "Traders reacted as cooler inflation strengthened the case for a near-term rate cut.",
    source: "Bureau of Labor Statistics",
  },
  {
    id: "fed-comments",
    date: "Aug 18",
    headline: "Fed Chair comments",
    description:
      "In remarks at a policy forum, the Fed Chair signaled openness to easing if labor market data continued to soften.",
    fromProbability: 46,
    toProbability: 52,
    whyItMattered:
      "Market moved following language read as more dovish than prior guidance.",
    source: "Federal Reserve remarks",
  },
  {
    id: "jobs-revision",
    date: "Aug 21",
    headline: "Jobs data revised",
    description:
      "Prior months' payroll figures were revised sharply lower, pointing to a weaker labor market than initially reported.",
    fromProbability: 51,
    toProbability: 60,
    whyItMattered:
      "Movement coincided with growing bets that the Fed would prioritize employment over inflation risk.",
    source: "Bureau of Labor Statistics",
  },
];

export const whyItMoved = {
  headline: "Weaker employment data increased expectations of a 25 bps cut.",
  detail:
    "Payrolls came in below forecast on Aug 21, and traders shifted probability away from \u201cno change\u201d toward a 25 bps cut over the following two sessions.",
};

export const upcomingCatalysts = [
  { label: "CPI release", date: "Sep 10", note: "Inflation print" },
  { label: "Jobs report", date: "Sep 5", note: "Labor market read" },
  { label: "Fed commentary", date: "Sep 12", note: "Scheduled remarks" },
  { label: "FOMC meeting", date: "Sep 17", note: "Rate decision" },
];

export interface AskPrompt {
  question: string;
  answer: string;
}

export const askThisMarketPrompts: AskPrompt[] = [
  {
    question: "Why did this probability rise?",
    answer:
      "Weaker-than-expected employment data increased expectations of a 25 bps cut, pushing this outcome from 44% to 57% over three sessions.",
  },
  {
    question: "What could change this market next?",
    answer:
      "The CPI release (Sep 10) and jobs report (Sep 5) are the next scheduled events most likely to move this market before the FOMC meeting.",
  },
  {
    question: "What would make this outcome less likely?",
    answer:
      "A hotter-than-expected inflation print or hawkish Fed commentary would reduce the case for a cut and could shift probability back toward \u201cno change.\u201d",
  },
];
