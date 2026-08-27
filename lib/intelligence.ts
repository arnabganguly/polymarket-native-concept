// UNDERSTAND — Market Intelligence (proposed)
// Lightweight, integrated context aimed at a curious, non-trading reader
// (e.g. a journalist researching the market) as much as a trader. Never
// claims to predict the outcome, and never fabricates quotes or headlines
// attributed to real people or publications — external links point to live
// search results on real platforms so readers can verify coverage
// themselves rather than trusting a paraphrase.

export type Audience = "trader" | "journalist" | "institution";

export interface ExternalLink {
  platform: "Twitter/X" | "Financial Times" | "Bloomberg" | "Reuters" | "Google News";
  label: string;
  url: string;
}

// Generic (persona-neutral) link builder — used by chart-native market
// events, which aren't shown through the persona selector.
function externalLinks(query: string): ExternalLink[] {
  const q = encodeURIComponent(query);
  return [
    { platform: "Twitter/X", label: "See live discussion", url: `https://twitter.com/search?q=${q}&f=live` },
    { platform: "Google News", label: "Browse recent coverage", url: `https://news.google.com/search?q=${q}` },
    { platform: "Financial Times", label: "Search FT reporting", url: `https://www.ft.com/search?q=${q}` },
  ];
}

// --- Persona system -------------------------------------------------------
// Every surface in the Understand panel (why / next / ask) is read
// differently depending on who's asking. Each persona gets its own accent
// color (used to visibly distinguish answers and link sets), its own search
// modifier (appended to outbound queries so external platforms are searched
// with that persona's framing in mind), and its own preferred outlets.

export const audienceFraming: Record<
  Audience,
  {
    label: string;
    tagline: string;
    emphasize: "why" | "next" | "ask";
    accent: string;
    searchModifier: string;
    linkIntro: string;
  }
> = {
  trader: {
    label: "Trader",
    tagline: "Fast, actionable context on what's moving this market and what could move it next.",
    emphasize: "next",
    accent: "#1652F0",
    searchModifier: "trading reaction odds",
    linkIntro: "Live reaction, for positioning:",
  },
  journalist: {
    label: "Journalist",
    tagline:
      "Neutral, sourced summaries with links to primary coverage — built for verification, not for quoting the summary itself.",
    emphasize: "why",
    accent: "#B45309",
    searchModifier: "explainer analysis context",
    linkIntro: "Sourcing for a story, for verification:",
  },
  institution: {
    label: "Institution / Risk Team",
    tagline:
      "Structural context to pair with the Trust score — what's driving the price, and how defensible that signal is.",
    emphasize: "ask",
    accent: "#4338CA",
    searchModifier: "risk assessment due diligence",
    linkIntro: "Coverage for due diligence:",
  },
};

// Each persona is routed to a different mix of outlets — a trader leans on
// live social reaction, a journalist on newsrooms, an institution on
// wire services more commonly used in risk memos.
const personaPlatforms: Record<Audience, ExternalLink["platform"][]> = {
  trader: ["Twitter/X", "Google News", "Financial Times"],
  journalist: ["Google News", "Financial Times", "Twitter/X"],
  institution: ["Bloomberg", "Reuters", "Financial Times"],
};

const platformUrl: Record<ExternalLink["platform"], (q: string) => string> = {
  "Twitter/X": (q) => `https://twitter.com/search?q=${q}&f=live`,
  "Google News": (q) => `https://news.google.com/search?q=${q}`,
  "Financial Times": (q) => `https://www.ft.com/search?q=${q}`,
  Bloomberg: (q) => `https://www.bloomberg.com/search?query=${q}`,
  Reuters: (q) => `https://www.reuters.com/site-search/?query=${q}`,
};

// Builds a persona-aware link set: the base query gets the persona's search
// modifier appended before being sent to that persona's preferred outlets —
// this is the "context passed along" the user asked for.
export function personaLinks(baseQuery: string, audience: Audience): ExternalLink[] {
  const framing = audienceFraming[audience];
  const q = encodeURIComponent(`${baseQuery} ${framing.searchModifier}`);
  return personaPlatforms[audience].map((platform) => ({
    platform,
    label: `Search as ${framing.label.split(" / ")[0].toLowerCase()}`,
    url: platformUrl[platform](q),
  }));
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

// "Why did this move?" — headline fact stays persona-neutral, but the
// detail and the surrounding commentary are framed differently depending on
// who's reading, and the outbound query carries that persona's context.
export const whyItMoved = {
  headline: "Weaker employment data increased expectations of a 25 bps cut.",
  query: "Fed rate cut probability September meeting",
  perAudience: {
    trader: {
      detail:
        "Payrolls came in below forecast on Aug 21, and price moved fast but stayed orderly — a clean repricing rather than a thin, gappy move. The Aug 12 CPI print and Aug 18 Fed remarks set up the breakout; see the chart markers above for the point-by-point levels.",
      commentary: [
        "Live reaction has focused on whether this holds above 55% into the next print.",
        "Some desks flagged the move as low-slippage, consistent with broad participation rather than one large order.",
        "Chatter is split on whether the market is now ahead of what the Fed has actually committed to.",
      ],
    },
    journalist: {
      detail:
        "The move from 44% to 57% traces to two dated, verifiable events: the Aug 12 CPI release and payroll revisions published Aug 21. Both are sourced directly from BLS data, which makes this a citable, dated move rather than a vague shift in \u201csentiment.\u201d",
      commentary: [
        "Coverage has generally framed this as 'odds shifted after a weaker jobs report,' not certainty of a cut.",
        "Financial press has focused on how the Fed is weighing labor weakness against inflation risk.",
        "A few commentators caution against over-reading a market move as a forecast of Fed action.",
      ],
    },
    institution: {
      detail:
        "Probability rose 13 points over three sessions while liquidity, spread, and breadth of participation stayed in the 'Strong' range throughout — support for treating this as a broad repricing your risk framework can weight accordingly, rather than a thin, single-actor signal.",
      commentary: [
        "The Aug 21 payroll revision is the more defensible driver to cite in a memo; the Aug 12 CPI print is corroborating.",
        "No single-counterparty concentration flags accompanied the move, per the Trust breakdown above.",
        "Some desks note the size of the move warrants a follow-up check after the Sep 10 CPI print.",
      ],
    },
  },
};

export interface Catalyst {
  label: string;
  date: string;
  note: string;
  query: string;
  perAudience: Record<Audience, string>;
}

export const upcomingCatalysts: Catalyst[] = [
  {
    label: "CPI release",
    date: "Sep 10",
    note: "Inflation print",
    query: "September CPI report forecast Fed",
    perAudience: {
      trader: "Expect the sharpest reaction in the first hour after release; a hot print could unwind part of the recent move fast.",
      journalist: "A clean, citable data point — good news peg if probability moves visibly right after release.",
      institution: "Treat any sharp post-release move as a trigger to re-check the Trust score, not just the probability.",
    },
  },
  {
    label: "Jobs report",
    date: "Sep 5",
    note: "Labor market read",
    query: "September jobs report forecast labor market",
    perAudience: {
      trader: "Another weak reading likely extends the move; a rebound could stall momentum before CPI.",
      journalist: "Pairs naturally with the Aug 21 revision story — a follow-up data point, not a new narrative.",
      institution: "A material downside surprise here would be the strongest scheduled catalyst for a position review.",
    },
  },
  {
    label: "Fed commentary",
    date: "Sep 12",
    note: "Scheduled remarks",
    query: "Federal Reserve commentary September rate outlook",
    perAudience: {
      trader: "Lower-conviction catalyst than the data prints, but can still move implied vol into the meeting.",
      journalist: "Worth watching for a shift in tone versus the Aug 18 remarks — that contrast is the story.",
      institution: "Flag in a pre-meeting note even if historical impact here has been smaller than the data releases.",
    },
  },
  {
    label: "FOMC meeting",
    date: "Sep 17",
    note: "Rate decision",
    query: "FOMC meeting September rate decision",
    perAudience: {
      trader: "The scheduled decision this market is ultimately pricing — position sizing should account for binary risk here.",
      journalist: "The resolution date for this market — the natural close for any piece written about it.",
      institution: "The terminal date for this exposure; confirm risk limits are sized for binary resolution risk.",
    },
  },
];

export interface AskPromptAnswer {
  text: string;
  query: string;
}

export interface AskPrompt {
  question: string;
  answers: Record<Audience, AskPromptAnswer>;
}

// Cycled while the "Ask this market" answer is being generated, purely for
// a realistic thinking animation — not a real processing pipeline.
export const thinkingPhrases = [
  "Reading the order book…",
  "Cross-referencing recent news…",
  "Weighing signal quality…",
  "Drafting an answer…",
];

export const askThisMarketPrompts: AskPrompt[] = [
  {
    question: "Why did this probability rise?",
    answers: {
      trader: {
        text: "This outcome ran from 44% to 57% over three sessions — a fast, orderly move, not a single large print. The breakout came right after the Aug 21 jobs revision, with the Aug 12 CPI cool print acting as an early tell. Liquidity and spread stayed tight through the move, so slippage on entries was minimal. If you're tracking momentum, the reaction to Sep 5 jobs and Sep 10 CPI is the next test of whether this holds above 55%.",
        query: "Fed rate cut probability rise employment data",
      },
      journalist: {
        text: "The shift from 44% to 57% traces to two dated events worth citing: the Aug 12 CPI release and payroll revisions published Aug 21. Both are verifiable through BLS releases, which makes this an easy move to source directly rather than relying on market commentary alone. For a story, the useful framing is \u201cmarket-implied odds moved after a weaker jobs report,\u201d not \u201ctraders knew a cut was coming\u201d — the data explains the timing, not certainty of outcome.",
        query: "Fed rate cut probability rise employment data",
      },
      institution: {
        text: "Probability rose 13 points over three sessions while Trust metrics — liquidity, spread, and breadth of participation — remained in the \u201cStrong\u201d band throughout. That combination supports treating the move as a broad repricing rather than a thin, single-actor signal your risk framework would need to discount. The Aug 21 payroll revision is the most defensible driver to cite in a memo; CPI on Aug 12 is corroborating, not primary.",
        query: "Fed rate cut probability rise employment data",
      },
    },
  },
  {
    question: "What could change this market next?",
    answers: {
      trader: {
        text: "Sep 5 jobs and Sep 10 CPI are the two prints most likely to move price before the Sep 17 decision — expect the sharpest reaction within the first hour of each release. Fed commentary on Sep 12 is a lower-conviction catalyst but can still move implied vol into the meeting. Watch spread and depth around each release; a widening spread would suggest the market is repricing risk, not just probability.",
        query: "September CPI jobs report Fed meeting schedule",
      },
      journalist: {
        text: "Three scheduled dates are worth diarizing for coverage: the Sep 5 jobs report, the Sep 10 CPI release, and Fed remarks on Sep 12, all ahead of the Sep 17 decision. Each is a public, citable data point, which makes them cleaner news pegs than trying to characterize \u201cmarket sentiment\u201d in the abstract. If probability moves sharply after one of these, that's the angle: what specific data point moved it, not vague market mood.",
        query: "September CPI jobs report Fed meeting schedule",
      },
      institution: {
        text: "From a risk-monitoring standpoint, the Sep 5 jobs report and Sep 10 CPI print are the two scheduled events most likely to require a position or exposure review before the Sep 17 decision. Fed commentary on Sep 12 is worth flagging in a pre-meeting note even though its historical impact here has been smaller. Treat any post-release move as a trigger to re-check the Trust score, not just the probability.",
        query: "September CPI jobs report Fed meeting schedule",
      },
    },
  },
  {
    question: "What would make this outcome less likely?",
    answers: {
      trader: {
        text: "A hot CPI print or hawkish Fed language would be the fastest way to see this fade — historically, moves of this size have partially unwound on a single surprise print rather than fully reversing. Watch how fast liquidity responds to any surprise; a slow fade suggests conviction is soft, a fast one suggests real repositioning.",
        query: "hawkish Fed commentary inflation rate cut odds",
      },
      journalist: {
        text: "The clearest counter-scenario to report is a hotter-than-expected inflation print or notably hawkish Fed remarks — both are concrete, attributable events rather than vague sentiment shifts. If you're writing about downside risk to this outcome, anchor it to one of those two triggers rather than general market uncertainty.",
        query: "hawkish Fed commentary inflation rate cut odds",
      },
      institution: {
        text: "A hawkish surprise — either a hot CPI print or explicit Fed language pushing back on near-term easing — is the most likely trigger for a reversal. Because the current move showed broad participation, a genuine reversal would likely also show up as a broad, liquid move rather than a thin one; a thin, low-liquidity pullback would be a weaker signal for adjusting risk positioning.",
        query: "hawkish Fed commentary inflation rate cut odds",
      },
    },
  },
];
