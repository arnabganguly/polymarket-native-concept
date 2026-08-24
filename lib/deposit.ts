// DEPOSIT — Fiat-native funding experience.
// Default flow speaks entirely in dollars. Crypto mechanics (USDC, pUSD,
// Polygon, wallet addresses, gas) are tucked behind an explicit,
// secondary "Deposit crypto instead" entry point.

export type PaymentMethodId = "apple-pay" | "debit" | "bank";

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  subtitle: string;
  badge?: string;
}

export const paymentMethods: PaymentMethod[] = [
  { id: "apple-pay", label: "Apple Pay", subtitle: "Instant · no fee", badge: "Fastest" },
  { id: "debit", label: "Debit Card", subtitle: "Instant · no fee" },
  { id: "bank", label: "Bank Account", subtitle: "1–3 business days · no fee" },
];

export const quickAmounts = [50, 100, 250, 500];

export interface CryptoAsset {
  id: string;
  label: string;
  network: string;
  address: string;
  minDeposit: string;
}

export const cryptoAssets: CryptoAsset[] = [
  {
    id: "usdc-polygon",
    label: "USDC",
    network: "Polygon",
    address: "0x9f2A...4E1c",
    minDeposit: "1 USDC",
  },
  {
    id: "pusd-polygon",
    label: "pUSD",
    network: "Polygon",
    address: "0x9f2A...4E1c",
    minDeposit: "1 pUSD",
  },
  {
    id: "usdc-ethereum",
    label: "USDC",
    network: "Ethereum",
    address: "0x9f2A...4E1c",
    minDeposit: "10 USDC",
  },
];

export const depositSteps = ["Enter amount", "Choose method", "Review", "Confirm"] as const;
