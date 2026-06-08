import { useReadContract, useBalance } from "wagmi";
import { RAFFLE_ADDRESS } from "@/lib/contracts/raffle";
import { ABI } from "@/lib/contracts/raffle";

export function useRaffleStats() {

    // Entrance Fee
    const { data: entranceFee, isLoading: entranceFeeLoading } = useReadContract({
        address: RAFFLE_ADDRESS,
        abi: ABI,
        functionName: "getEntranceFee"
    });

    // Players
    const playersQuery = useReadContract({
        address: RAFFLE_ADDRESS,
        abi: ABI,
        functionName: "getNumberOfPlayers",
    });

    // Pool Balance
    const poolMoney = useBalance({
        address: RAFFLE_ADDRESS,
    });
    const raffleStateQuery = useReadContract({
        address: RAFFLE_ADDRESS,
        abi: ABI,
        functionName: "getRaffleState",
    });
    const recentWinnerQuery = useReadContract({
        address: RAFFLE_ADDRESS,
        abi: ABI,
        functionName: "getRecentWinner",
    });

    const players = playersQuery.data;
    const playersLoading = playersQuery.isLoading;
    const poolBalance = poolMoney.data;
    const poolLoading = poolMoney.isLoading;
    const raffleState = raffleStateQuery.data;
    const raffleStateLoading = raffleStateQuery.isLoading;
    const recentWinner = recentWinnerQuery.data;
    const recentWinnerLoading = recentWinnerQuery.isLoading;

    //Combined Loading State
    const isLoading = 
        entranceFeeLoading || playersLoading || poolLoading || raffleStateLoading || recentWinnerLoading;

    const refetchStats = async () => {
        await Promise.all([
            playersQuery.refetch(),
            poolMoney.refetch(),
        ]);
    }

    const normalizedRaffleState =
        Number(raffleState) == 0
            ? "OPEN"
            : "CALCULATING";

    return {
        entranceFee,
        players,
        poolAmount: poolBalance?.formatted,
        raffleState: normalizedRaffleState,
        recentWinner,
        isLoading,
        refetchStats,
    }
}