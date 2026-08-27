// UNDERSTAND — Market Intelligence (proposed)
// Lightweight, integrated context aimed at a curious, non-trading reader
// (e.g. a journalist researching the market) as much as a trader. Never
// claims to predict the outcome, and never fabricates quotes or headlines
// attributed to real people or publications — external links point to live
// search results on real platforms so readers can verify coverage
// themselves rather than trusting a paraphrase.

export interface ExternalLink {
  platform: "Twitter/X" | "Financial Times" | "Bloomberg" | "Reuters" | "Google News";
  label: string;
  url: string;
}

function externalLinks(query: string): ExternalLink[] {
  const q = encodeURIComponent(query);
  return [
    { platform: "Twitter/X", label: "See live discussion", url: `https://twitter.com/search?q=${q}&f=live` },
    { platform: "Google News", label: "Browse recent coverage", url: `https://news.google.com/search?q=${q}` },
    { platform: "Financial Times", label: "Search FT reporting", url: `https://www.ft.com/search?q=${q}` },
  ];
}

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
  links: ExternalLink[];
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
    links: externalLinks("August CPI report Fed rate cut reaction"),
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
    links: externalLinks("Fed Chair speech dovish rate cut signal"),
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
    links: externalLinks("payrolls revised lower labor market Fed"),
  },
];

export const whyItMoved = {
  headline: "Weaker employment data increased expectations of a 25 bps cut.",
  detail:
    "Payrolls came in below forecast on Aug 21, and traders shifted probability away from \u201cno change\u201d toward a 25 bps cut over the following two sessions. The CPI print on Aug 12 and Fed Chair remarks on Aug 18 set up the move; see the markers on the chart above for a point-by-point breakdown.",
  // Neutral, unattributed summaries of the kind of discussion happening
  // around this market — not quotes, not attributed to specific people.
  commentary: [
    "Social discussion has centered on whether cooler inflation locks in a cut at the next meeting.",
    "Financial press coverage has focused on how the Fed is weighing labor-market weakness against inflation risk.",
    "Some commentators note the market may already be pricing in more easing than the Fed has committed to.",
  ],
  links: externalLinks("Fed rate cut probability September meeting"),
};

export interface Catalyst {
  label: string;
  date: string;
  note: string;
  whatToWatch: string;
  links: ExternalLink[];
}

export const upcomingCatalysts: Catalyst[] = [
  {
    label: "CPI release",
    date: "Sep 10",
    note: "Inflation print",
    whatToWatch:
      "A hotter print would undercut the case for a cut; a cooler one would likely reinforce it further.",
    links: externalLinks("September CPI report forecast Fed"),
  },
  {
    label: "Jobs report",
    date: "Sep 5",
    note: "Labor market read",
    whatToWatch:
      "Another weak reading would add to the case for easing; a rebound could stall the recent move.",
    links: externalLinks("September jobs report forecast labor market"),
  },
  {
    label: "Fed commentary",
    date: "Sep 12",
    note: "Scheduled remarks",
    whatToWatch: "Traders will parse tone for any shift toward or away from cutting.",
    links: externalLinks("Federal Reserve commentary September rate outlook"),
  },
  {
    label: "FOMC meeting",
    date: "Sep 17",
    note: "Rate decision",
    whatToWatch: "The scheduled decision this market is ultimately pricing.",
    links: externalLinks("FOMC meeting September rate decision"),
  },
];

export interface AskPrompt {
  question: string;
  answer: string;
  links: ExternalLink[];
}

// Cycled while the "Ask this market" answer is being generated, purely for
// a realistic thinking animation — not a real processing pipeline.
export const thinkingPhrases = [
  "Reading the order book…",
  "Cross-referencing recent news…",
  "Weighing signal quality…",
  "Drafting an answer…",
];


export type Audience = "trader" | "journalist" | "institution";

export const audienceFraming: Record<
  Audience,
  { label: string; tagline: string; emphasize: "why" | "next" | "ask" }
> = {
  trader: {
    label: "Trader",
    tagline: "Fast, actionable context on what's moving this market and what could move it next.",
    emphasize: "next",
  },
  journalist: {
    label: "Journalist",
    tagline:
      "Neutral, sourced summaries with links to primary coverage — built for verification, not for quoting the summary itself.",
    emphasize: "why",
  },
  institution: {
    label: "Institution / Risk Team",
    tagline:
      "Structural context to pair with the Trust score — what's driving the price, and how defensible that signal is.",
    emphasize: "ask",
  },
};

export const askThisMarketPrompts: AskPrompt[] = [
  {
    question: "Why did this probability rise?",
    answer:
      "This outcome moved from 44% to 57% over three trading sessions, and the timing lines up closely with two catalysts: weaker-than-expected employment data on Aug 21 and a cooler CPI print on Aug 12. Taken together, these releases appear to have strengthened the case for a near-term rate cut in traders' eyes. The move was gradual rather than a single spike, which is consistent with broad repricing across many participants rather than one large position pushing the price. Liquidity and spread held steady throughout the move, another sign the shift reflects genuine sentiment rather than a temporary imbalance.",
    links: externalLinks("Fed rate cut probability rise employment data"),
  },
  {
    question: "What could change this market next?",
    answer:
      "Two scheduled releases stand out before the Sep 17 FOMC meeting: the Sep 5 jobs report and the Sep 10 CPI print. Either could meaningfully shift probability — a weak jobs number or a soft inflation read would likely reinforce the current lean toward a cut, while stronger prints on both could stall or reverse the recent move. Fed commentary scheduled for Sep 12 is also worth watching, since remarks made close to a meeting tend to be parsed closely for tone. If you're tracking this market, those three dates are the most likely points for a meaningful re-rating one way or the other.",
    links: externalLinks("September CPI jobs report Fed meeting schedule"),
  },
  {
    question: "What would make this outcome less likely?",
    answer:
      "A hotter-than-expected inflation print or a notably hawkish tone from Fed officials would be the most direct way this could reverse. Historically, moves of this size have partially unwound when subsequent data surprised in the opposite direction, so a single strong print may only dent the probability rather than erase it entirely. It's also worth watching how quickly liquidity and participation respond to any surprise — a fast, broad-based move would suggest the market is genuinely repricing its expectations, while a shift driven by just a handful of large trades would be a weaker signal.",
    links: externalLinks("hawkish Fed commentary inflation rate cut odds"),
  },
];
