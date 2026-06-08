"use client";

import { useMemo } from "react";
import { useReadContract, useReadContracts } from "wagmi";

import { ABI, RAFFLE_ADDRESS } from "@/lib/contracts/raffle";

export function useRafflePlayers() {
  // Get total player count
  const playersCountQuery = useReadContract({
    address: RAFFLE_ADDRESS,
    abi: ABI,
    functionName: "getNumberOfPlayers",
  });

  const playerCount = Number(playersCountQuery.data ?? 0);

  // Build multicall contracts array
  const playerContracts = useMemo(
    () =>
      Array.from({ length: playerCount }, (_, index) => ({
        address: RAFFLE_ADDRESS,
        abi: ABI,
        functionName: "getPlayer",
        args: [BigInt(index)] as const,
      })),
    [playerCount]
  );

  // Fetch all players
  const playersQuery = useReadContracts({
    contracts: playerContracts,
    query: {
      enabled: playerCount > 0,
    },
  });

  // Normalize results
  const playersList =
    playersQuery.data?.map((result) => result.result as string) ?? [];

  const isLoading =
    playersCountQuery.isLoading ||
    playersQuery.isLoading;

  const refetchPlayers = async () => {
    await Promise.all([
      playersCountQuery.refetch(),
      playersQuery.refetch(),
    ]);
  };

  return {
    playersList,
    playerCount,
    isLoading,
    refetchPlayers,
  };
}