"use client";

import { useReadContract } from "wagmi";
import { RAFFLE_ADDRESS } from "@/lib/contracts/raffle";
import { ABI } from "@/lib/contracts/raffle";

export default function ContractTest() {
  const { data } = useReadContract({
    address: RAFFLE_ADDRESS,
    abi: ABI,
    functionName: "getEntranceFee",
  });

  return (
    <div>
      Entrance Fee: {data?.toString()}
    </div>
  );
}