// UNDERSTAND — Market Intelligence (proposed)
// Lightweight, integrated context. Never claims to predict the outcome.

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
