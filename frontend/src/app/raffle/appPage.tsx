"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Settings,
  Ticket,
  Star,
  User,
  Copy,
  Check,
  ShieldCheck,
} from "lucide-react";
import { useRaffleStats } from "@/hooks/useRaffleStats";
import { useEnterRaffle } from "@/hooks/useEnterRaffle";
import { RAFFLE_ADDRESS } from "@/lib/contracts/raffle";
import { useRafflePlayers } from "@/hooks/useRafflePlayers";
import { TransactionStatusModal } from "./TransactionStatusModal";

export default function AppPage() {
  
  const formatAddress = (address?: string) => {
    if (
      !address ||
      address === "0x0000000000000000000000000000000000000000"
    ) {
      return "No Winner Yet";
    }

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  const { 
    entranceFee, players, poolAmount, isLoading, refetchStats, raffleState, recentWinner,
  } = useRaffleStats();
  const {
    enterRaffle, isPending, isConfirming, isConfirmed, error
  } = useEnterRaffle();

  const showTransactionModal = isPending || isConfirming;

  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isEntering2, setIsEntering] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText("0xABC123abc456def7890");
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  }

  const isEntering = isPending;
  const handleEnterRaffle = async () => {
    try {
      await enterRaffle();
    }
    catch (err) {
      console.log("Transaction failed: ", err)
    }
  }

  const {
    playersList: rafflePlayers,
    isLoading: playersLoading,
  } = useRafflePlayers();

  useEffect(() => {
    if(isConfirmed) {
      refetchStats();
    }
  }, [isConfirmed, refetchStats]);

  return (
    <div className="bg-[#111417] text-[#e1e2e7] min-h-screen flex flex-col font-sans overflow-x-hidden relative">
      {/* Top Navbar */}
      <Navbar variant="dashboard" />

      {/* Main Grid Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto w-full min-w-0 px-6 md:px-12 py-8 relative z-10">
        {/* Hero Section / Main Raffle */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full min-w-0">
          <div className="lg:col-span-8 flex flex-col gap-6 w-full min-w-0">
            {/* Mega Raffle Card */}
            <div className="glass-card-dashboard rounded-xl p-8 relative overflow-hidden group border border-white/10 bg-[#1d2023]/40 backdrop-blur-2xl w-full min-w-0">
              {/* Background Glow Decor */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#adc6ff]/10 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#4edea3]/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 relative z-10 w-full min-w-0">
                <div>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gradient bg-gradient-to-r from-[#adc6ff] to-[#4edea3] bg-clip-text text-transparent">
                    Current Mega Raffle
                  </h2>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="px-4 py-1 bg-[#4edea3]/20 text-[#4edea3] text-xs font-semibold rounded-full border border-[#4edea3]/30">
                      State: {raffleState}
                    </span>
                    <span className="text-[#c2c6d6] text-sm">• Ends in 14h 22m</span>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end shrink-0 mt-2 md:mt-0">
                  <span className="text-[#c2c6d6] text-xs font-semibold mb-1">
                    Contract Address
                  </span>
                  <div className="flex items-center gap-2 bg-[#1d2023]/60 px-3 py-1.5 rounded-lg border border-white/5">
                    <code className="text-sm font-mono text-[#adc6ff]">
                      {formatAddress(RAFFLE_ADDRESS)}
                    </code>
                    <button
                      onClick={copyAddress}
                      className="text-[#c2c6d6] hover:text-[#adc6ff] transition-colors cursor-pointer flex items-center justify-center p-0.5"
                      title="Copy Address"
                      aria-label="Copy Address"
                    >
                      {copiedAddress ? (
                        <Check className="h-4 w-4 text-[#4edea3]" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10 w-full min-w-0">
                <div className="flex flex-col gap-1 p-6 bg-[#1d2023]/60 backdrop-blur-sm rounded-lg border border-white/5 w-full min-w-0">
                  <span className="text-[#c2c6d6] text-xs font-semibold">
                    Entrance Fee
                  </span>
                  <span className="text-2xl font-bold text-[#e1e2e7]">
                    {entranceFee ? `${Number(entranceFee) / 1e18} ETH` : "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-6 bg-[#1d2023]/60 backdrop-blur-sm rounded-lg border border-white/5 w-full min-w-0">
                  <span className="text-[#c2c6d6] text-xs font-semibold">
                    Total Players
                  </span>
                  <span className="text-2xl font-bold text-[#e1e2e7]">
                    {players ? Number(players) : 0}
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-6 bg-[#1d2023]/60 backdrop-blur-sm rounded-lg border border-white/5 w-full min-w-0">
                  <span className="text-[#c2c6d6] text-xs font-semibold">
                    Pool Amount
                  </span>
                  <span className="text-2xl font-bold text-[#4edea3]">
                    {poolAmount ? `${poolAmount} ETH` : "0 ETH"}
                  </span>
                </div>
              </div>

              <div className="relative z-10">
                <button
                  onClick={handleEnterRaffle}
                  disabled={isEntering || isLoading}
                  className="w-full bg-[#adc6ff] text-[#00285d] text-xl font-bold py-4 rounded-xl glowing-primary hover:shadow-[0_0_30px_rgba(77,142,255,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isEntering ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#00285d] border-t-transparent" />
                  ) : (
                    <Ticket className="h-5 w-5 fill-[#00285d]" />
                  )}
                  {isEntering ? "Entering..." : "Enter Raffle"}
                </button>
              </div>
            </div>

            {/* Previous Winner Section */}
            <div className="glass-card-dashboard rounded-xl p-6 border border-white/5 bg-[#1d2023]/40 backdrop-blur-2xl w-full min-w-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#e1e2e7]">Previous Winner</h3>
                <Star className="h-5 w-5 text-[#adc6ff] fill-[#adc6ff]" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#1d2023]/60 backdrop-blur-sm rounded-lg border border-white/5 relative overflow-hidden group w-full min-w-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4edea3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-[#323538] flex items-center justify-center border border-white/10 shrink-0">
                    <User className="h-5 w-5 text-[#4edea3]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-base text-[#e1e2e7] truncate">
                      {formatAddress(recentWinner as string)}
                    </span>
                    <span className="text-xs text-[#c2c6d6] font-semibold">
                      Prize Won: 1.85 ETH
                    </span>
                  </div>
                </div>
                <div className="shrink-0 mt-2 sm:mt-0">
                  <span className="text-[#4edea3] text-xs font-semibold px-4 py-1.5 bg-[#4edea3]/10 border border-[#4edea3]/20 rounded-full shadow-[0_0_10px_rgba(78,222,163,0.2)] block text-center">
                    Transaction Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Players List */}
          <div className="lg:col-span-4 h-full w-full min-w-0">
            <div className="glass-card-dashboard rounded-xl p-6 flex flex-col h-[600px] border border-white/5 bg-[#1d2023]/40 backdrop-blur-2xl w-full min-w-0">
              <div className="flex items-center justify-between mb-6 shrink-0">
                <h3 className="text-2xl font-bold text-[#e1e2e7]">Recent Players</h3>
                <span className="text-xs font-semibold text-[#adc6ff] bg-[#adc6ff]/10 px-4 py-1.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff] animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="flex-grow overflow-y-auto space-y-3 pr-1 min-h-0">
                {rafflePlayers.map((player, index) => (
                  <div
                    key={index + 1}
                    className="flex items-center justify-between p-4 bg-[#1d2023]/60 backdrop-blur-sm rounded-lg border border-white/5 hover:border-[#adc6ff]/20 transition-all cursor-default w-full min-w-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#adc6ff]/20 to-[#d0bcff]/20 border border-white/10 flex items-center justify-center text-xs text-[#e1e2e7] font-bold shrink-0">
                        {index + 1}
                      </div>
                      <span className="font-mono text-sm text-[#e1e2e7] truncate">
                        {formatAddress(player)}
                      </span>
                    </div>
                    <span className="text-xs text-[#c2c6d6] font-semibold shrink-0">
                      ACTIVE
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full py-3.5 bg-[#1d2023]/60 border border-white/10 text-[#c2c6d6] text-xs font-semibold hover:text-[#adc6ff] transition-colors shrink-0 cursor-pointer rounded-lg">
                View All Participants
              </button>
            </div>
          </div>
        </section>

        {/* Stats Bento Grid */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full min-w-0">
          <div className="glass-card-dashboard p-6 rounded-xl border border-white/5 bg-[#1d2023]/40 backdrop-blur-2xl flex flex-col w-full min-w-0">
            <span className="text-[#c2c6d6] text-xs font-semibold mb-1">
              Active Stakers
            </span>
            <span className="text-2xl font-bold text-[#e1e2e7]">1,204</span>
            <div className="mt-4 h-1 bg-[#1d2023] rounded-full overflow-hidden">
              <div className="h-full bg-[#adc6ff] w-2/3"></div>
            </div>
          </div>
          <div className="glass-card-dashboard p-6 rounded-xl border border-white/5 bg-[#1d2023]/40 backdrop-blur-2xl flex flex-col w-full min-w-0">
            <span className="text-[#c2c6d6] text-xs font-semibold mb-1">
              Yield Generated
            </span>
            <span className="text-2xl font-bold text-[#4edea3]">42.8 ETH</span>
            <div className="mt-4 h-1 bg-[#1d2023] rounded-full overflow-hidden">
              <div className="h-full bg-[#4edea3] w-1/2"></div>
            </div>
          </div>
          <div className="glass-card-dashboard p-6 rounded-xl border border-white/5 bg-[#1d2023]/40 backdrop-blur-2xl flex flex-col w-full min-w-0">
            <span className="text-[#c2c6d6] text-xs font-semibold mb-1">
              Total Raffles Run
            </span>
            <span className="text-2xl font-bold text-[#e1e2e7]">582</span>
            <div className="mt-4 h-1 bg-[#1d2023] rounded-full overflow-hidden">
              <div className="h-full bg-[#c4abff] w-4/5"></div>
            </div>
          </div>
          <div className="glass-card-dashboard p-6 rounded-xl border border-white/5 bg-[#1d2023]/40 backdrop-blur-2xl flex flex-col w-full min-w-0">
            <span className="text-[#c2c6d6] text-xs font-semibold mb-1">
              Protocol Security
            </span>
            <span className="text-2xl font-bold text-[#adc6ff] flex items-center gap-1">
              99.9% <ShieldCheck className="h-5 w-5 text-[#adc6ff] inline" />
            </span>
            <div className="mt-4 h-1 bg-[#1d2023] rounded-full overflow-hidden">
              <div className="h-full bg-[#adc6ff] w-full"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Background Atmospheric Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#adc6ff]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#4edea3]/10 blur-[120px] rounded-full"></div>
      </div>
      <TransactionStatusModal isOpen={showTransactionModal} />
    </div>
  );
}
