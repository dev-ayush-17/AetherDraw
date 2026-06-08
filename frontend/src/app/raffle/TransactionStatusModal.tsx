"use client";

import { Hourglass } from "lucide-react";

interface TransactionStatusModalProps {
  isOpen: boolean;
}

export function TransactionStatusModal({
  isOpen,
}: TransactionStatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#11141b] p-8 shadow-2xl">
        <div className="flex flex-col items-center justify-center gap-4">
          <Hourglass
            size={48}
            className="text-[#d0bcff] animate-pulse"
          />

          <h2 className="text-xl font-semibold text-white">
            Transaction In Progress
          </h2>

          <p className="text-center text-sm text-[#b8bcc8]">
            Please confirm the transaction in your wallet and
            wait for blockchain confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}