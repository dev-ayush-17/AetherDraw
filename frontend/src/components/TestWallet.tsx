"use client";

import { useEnterRaffle } from "@/hooks/useEnterRaffle";

export default function EnterRaffleButton() {
  const { enterRaffle, isPending, isConfirming, isConfirmed, hash } = useEnterRaffle();

  return (
    <>
    <button
      onClick={enterRaffle}
      disabled={isPending || isConfirming}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {isPending && "Waiting for wallet..."}
      {isConfirming && "Confirming on blockchain..."}
      {!isPending && !isConfirming && "Enter Raffle (0.01 ETH)"}
    </button>
    {isConfirmed && (
      <p className="text-green-500 mt-2">
        🎉 Successfully entered raffle!
      </p>
    )}
    </>
  );
}