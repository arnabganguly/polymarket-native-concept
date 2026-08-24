// COMMENTS — mocked discussion thread beneath the trade, matching
// Polymarket's pattern of letting traders discuss a market inline. All
// names, avatars and bodies are fictional demo content.

export interface MarketComment {
  id: string;
  author: string;
  avatarColor: string;
  position?: string; // e.g. "Yes · 120 shares"
  timeAgo: string;
  body: string;
  likes: number;
}

export const commentSort = ["Newest", "Top"] as const;

export const marketComments: MarketComment[] = [
  {
    id: "c1",
    author: "macro_watcher",
    avatarColor: "#1652F0",
    position: "Yes · 340 shares",
    timeAgo: "2h",
    body: "The jobs revision on the 21st was the real trigger here. CPI just confirmed the direction.",
    likes: 24,
  },
  {
    id: "c2",
    author: "rateswatcher22",
    avatarColor: "#C21B3D",
    timeAgo: "4h",
    body: "Careful — still 3 weeks until FOMC. A hot CPI print on Sep 10 could unwind a chunk of this move.",
    likes: 17,
  },
  {
    id: "c3",
    author: "quietalpha",
    avatarColor: "#0F9D58",
    position: "Yes · 85 shares",
    timeAgo: "6h",
    body: "Liquidity here is solid and it's not just one or two whales pushing price — feels like a real repricing, not noise.",
    likes: 12,
  },
  {
    id: "c4",
    author: "skeptical_trader",
    avatarColor: "#E4A11B",
    timeAgo: "9h",
    body: "Anyone have a source for the Fed Chair remarks quoted in the news roundup? Want to check the transcript myself.",
    likes: 5,
  },
  {
    id: "c5",
    author: "fedwatch_dana",
    avatarColor: "#6D3EF2",
    position: "No · 60 shares",
    timeAgo: "1d",
    body: "Took a small hedge on no-change. Still think the Fed talks tougher than the market is pricing.",
    likes: 8,
  },
];
