"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";

const raffleAbi = [
    {
        name: "enterRaffle",
        type: "function",
        stateMutability: "payable",
        inputs: [],
        outputs: [],
    },
] as const;

const RAFFLE_ADDRESS = "0xAC11d5204d1Cdd0FE09436F7B10a09057154953A"

export function useEnterRaffle() {
    const {
        writeContractAsync,
        isPending,
        error,
        data: hash,
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
    } = useWaitForTransactionReceipt({
        hash,
    })

    const enterRaffle = async () => {
        try {
            const txhash = await writeContractAsync({
                address: RAFFLE_ADDRESS,
                abi: raffleAbi,
                functionName: "enterRaffle",
                value: parseEther("0.01"),
            });

            console.log("Transaction Hash:", txhash);
            return txhash;
        }
        catch (error) {
            console.log("Enter Raffle failed:", error);
            throw error;
        }
    };

    return {
        enterRaffle, isPending, isConfirming, isConfirmed, error, hash,
    };
}
