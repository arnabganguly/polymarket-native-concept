"use client";

import { useEffect, useState } from "react";
import {
  X,
  Apple,
  CreditCard,
  Landmark,
  ChevronLeft,
  Loader2,
  Check,
  Copy,
  Wallet,
} from "lucide-react";
import { cryptoAssets, paymentMethods, quickAmounts, type PaymentMethodId } from "@/lib/deposit";
import { useExperience } from "@/lib/experience-context";

type Step = "amount" | "method" | "review" | "processing" | "success" | "crypto";

const methodIcon: Record<PaymentMethodId, React.ReactNode> = {
  "apple-pay": <Apple size={18} />,
  debit: <CreditCard size={18} />,
  bank: <Landmark size={18} />,
};

export function DepositModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { balance, addFunds } = useExperience();
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState(100);
  const [method, setMethod] = useState<PaymentMethodId | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Reset internal state whenever the modal is (re)opened.
  useEffect(() => {
    if (open) {
      setStep("amount");
      setAmount(100);
      setMethod(null);
    }
  }, [open]);

  useEffect(() => {
    if (step !== "processing") return;
    const t = setTimeout(() => {
      addFunds(amount);
      setStep("success");
    }, 1100);
    return () => clearTimeout(t);
  }, [step, amount, addFunds]);

  if (!open) return null;

  const selectedMethod = paymentMethods.find((m) => m.id === method) ?? null;

  function handleClose() {
    onClose();
  }

  function copyAddress(id: string, address: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(address).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4" onClick={handleClose}>
      <div
        className="w-full max-w-[380px] rounded-2xl border border-gray-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            {step !== "amount" && step !== "success" && step !== "processing" && (
              <button
                onClick={() => setStep(step === "crypto" ? "amount" : step === "review" ? "method" : "amount")}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Back"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            <span className="text-[16px] font-bold text-gray-900">
              {step === "crypto" ? "Deposit crypto" : step === "success" ? "Deposit complete" : "Add funds"}
            </span>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-5">
          {step === "amount" && (
            <AmountStep amount={amount} setAmount={setAmount} onNext={() => setStep("method")} />
          )}

          {step === "method" && (
            <MethodStep
              method={method}
              setMethod={setMethod}
              onNext={() => setStep("review")}
              onCrypto={() => setStep("crypto")}
            />
          )}

          {step === "review" && selectedMethod && (
            <ReviewStep amount={amount} method={selectedMethod} onConfirm={() => setStep("processing")} />
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
              <Loader2 size={28} className="animate-spin text-[#1652F0]" />
              <div className="text-[13px] font-semibold text-gray-500">Processing your deposit…</div>
            </div>
          )}

          {step === "success" && (
            <SuccessStep amount={amount} balance={balance} onDone={handleClose} />
          )}

          {step === "crypto" && (
            <CryptoStep onBack={() => setStep("method")} onCopy={copyAddress} copiedId={copiedId} />
          )}
        </div>
      </div>
    </div>
  );
}

function AmountStep({
  amount,
  setAmount,
  onNext,
}: {
  amount: number;
  setAmount: (n: number) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-1 py-2">
        <div className="flex items-center text-[13px] font-medium text-gray-400">USD</div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-[36px] font-bold text-gray-300">$</span>
          <input
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Math.max(0, +e.target.value || 0))}
            className="w-40 bg-transparent text-center text-[44px] font-extrabold leading-none text-gray-900 outline-none"
            autoFocus
          />
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {quickAmounts.map((v) => (
          <button
            key={v}
            onClick={() => setAmount(v)}
            className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-bold transition-colors ${
              amount === v ? "bg-[#1652F0] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            ${v}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={amount <= 0}
        className="rounded-lg bg-[#1652F0] py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#1142cc] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        Continue
      </button>
    </div>
  );
}

function MethodStep({
  method,
  setMethod,
  onNext,
  onCrypto,
}: {
  method: PaymentMethodId | null;
  setMethod: (m: PaymentMethodId) => void;
  onNext: () => void;
  onCrypto: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[12.5px] font-semibold text-gray-500">Choose a payment method</div>
      <div className="flex flex-col gap-2">
        {paymentMethods.map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={`flex items-center justify-between rounded-xl border px-3.5 py-3 text-left transition-colors ${
              method === m.id ? "border-[#1652F0] bg-[#1652F0]/5" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                {methodIcon[m.id]}
              </span>
              <div>
                <div className="flex items-center gap-1.5 text-[13.5px] font-bold text-gray-900">
                  {m.label}
                  {m.badge && (
                    <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9.5px] font-bold text-emerald-700">
                      {m.badge}
                    </span>
                  )}
                </div>
                <div className="text-[11.5px] text-gray-500">{m.subtitle}</div>
              </div>
            </div>
            <span
              className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                method === m.id ? "border-[#1652F0] bg-[#1652F0]" : "border-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!method}
        className="rounded-lg bg-[#1652F0] py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#1142cc] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        Continue
      </button>

      <button
        onClick={onCrypto}
        className="flex items-center justify-center gap-1.5 text-[12px] font-semibold text-gray-400 hover:text-gray-600"
      >
        <Wallet size={13} />
        Deposit crypto instead
      </button>
    </div>
  );
}

function ReviewStep({
  amount,
  method,
  onConfirm,
}: {
  amount: number;
  method: { id: PaymentMethodId; label: string; subtitle: string };
  onConfirm: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="text-[12px] font-semibold text-gray-500">You&apos;re adding</div>
        <div className="text-[28px] font-extrabold text-gray-900">${amount.toFixed(2)}</div>
      </div>

      <div className="flex flex-col gap-2 text-[13px]">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Payment method</span>
          <span className="flex items-center gap-1.5 font-semibold text-gray-900">
            {methodIcon[method.id]}
            {method.label}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Fee</span>
          <span className="font-semibold text-gray-900">$0.00</span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-2">
          <span className="font-semibold text-gray-700">Total</span>
          <span className="font-bold text-gray-900">${amount.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="rounded-lg bg-[#1652F0] py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#1142cc]"
      >
        Confirm deposit
      </button>
    </div>
  );
}

function SuccessStep({ amount, balance, onDone }: { amount: number; balance: number; onDone: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-2 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Check size={26} strokeWidth={2.5} />
      </span>
      <div>
        <div className="text-[15px] font-bold text-gray-900">${amount.toFixed(2)} added</div>
        <div className="mt-1 text-[13px] text-gray-500">
          Available balance:{" "}
          <span className="font-bold text-gray-900">
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      <button
        onClick={onDone}
        className="w-full rounded-lg bg-gray-900 py-3 text-[14px] font-bold text-white hover:bg-gray-800"
      >
        Done
      </button>
    </div>
  );
}

function CryptoStep({
  onBack,
  onCopy,
  copiedId,
}: {
  onBack: () => void;
  onCopy: (id: string, address: string) => void;
  copiedId: string | null;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[12.5px] text-gray-500">
        Send supported assets directly to your Polymarket address. Funds appear after network confirmation.
      </div>
      <div className="flex flex-col gap-2">
        {cryptoAssets.map((a) => (
          <div key={a.id} className="rounded-xl border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-bold text-gray-900">
                  {a.label} <span className="font-medium text-gray-400">· {a.network}</span>
                </div>
                <div className="mt-0.5 font-mono text-[11.5px] text-gray-500">{a.address}</div>
              </div>
              <button
                onClick={() => onCopy(a.id, a.address)}
                className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-[11px] font-semibold text-gray-600 hover:bg-gray-100"
              >
                <Copy size={12} />
                {copiedId === a.id ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="mt-1.5 text-[10.5px] text-gray-400">Minimum deposit: {a.minDeposit}</div>
          </div>
        ))}
      </div>
      <button
        onClick={onBack}
        className="flex items-center justify-center gap-1.5 text-[12px] font-semibold text-gray-400 hover:text-gray-600"
      >
        <ChevronLeft size={13} />
        Back to dollar deposit
      </button>
    </div>
  );
}
