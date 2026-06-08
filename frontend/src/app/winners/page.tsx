"use client";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Trophy,
  Star,
  Clock,
} from "lucide-react";
import { useRaffleStats } from "@/hooks/useRaffleStats";
import { RAFFLE_ADDRESS } from "@/lib/contracts/raffle";
import Link from "next/link";



export default function WinnerPickedPage() {
  useEffect(() => {
    const container = document.getElementById("confetti-container");
    if (!container) return;
    const colors = ["#adc6ff", "#d0bcff", "#4edea3", "#ffffff"];
    const makeConfetti = () => {
      // Create confetti particles
      for (let i = 0; i < 40; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        const size = Math.random() * 6 + 4;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-10px";
        confetti.style.position = "absolute";
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "10";
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 4;
        confetti.style.animation = `confetti-fall ${duration}s linear ${delay}s infinite`;
        container.appendChild(confetti);
        // Clean up DOM element to prevent leak
        setTimeout(() => {
          confetti.remove();
        }, (duration + delay) * 1000);
      }
    };
    makeConfetti();
    const interval = setInterval(makeConfetti, 8000);
    return () => clearInterval(interval);
  }, []);


    const {
    recentWinner,
    poolAmount,
    players,
    raffleState,
    } = useRaffleStats();

    const formatAddress = (address?: string) => {
        if (
        !address ||
        address === "0x0000000000000000000000000000000000000000"
        ) {
        return "No Winner Yet";
        }

        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };


  return (
    <div className="bg-[#111417] text-[#e1e2e7] min-h-screen flex flex-col font-sans overflow-x-hidden relative">
      {/* Top Navbar */}
      <Navbar variant="dashboard" />
      {/* Main Container */}
      <main
        className="flex-grow w-full max-w-7xl mx-auto w-full min-w-0 px-6 md:px-12 py-8 relative z-10"
        id="confetti-container"
      >
        {/* Main Dashboard Header */}
        <header className="mb-8 w-full max-w-7xl mx-auto w-full min-w-0">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#e1e2e7]">
            Grand Raffle #042
          </h1>
          <p className="text-[#c2c6d6] text-base">
            The results are in. Verifiable randomness has selected our latest winner.
          </p>
        </header>
        {/* Main Grid content */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full max-w-7xl mx-auto w-full min-w-0">
          <div className="lg:col-span-8 space-y-6 w-full min-w-0">
            {/* Highlighted Winner Card */}
            <div className="glass-card-dashboard winner-glow rounded-xl p-8 relative overflow-hidden group border border-[#c4abff]/30 bg-[#1d2023]/40 backdrop-blur-2xl w-full min-w-0 shadow-[0_0_40px_rgba(208,188,255,0.2)]">
              {/* Subtle Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#d0bcff]/15 blur-[100px] rounded-full group-hover:bg-[#d0bcff]/25 transition-all pointer-events-none"></div>
              <div className="relative z-10 w-full min-w-0">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6 w-full min-w-0">
                  <div>
                    <span className="bg-[#571bc1]/60 text-[#c4abff] text-xs font-semibold px-4 py-1.5 rounded-full inline-block mb-2 border border-[#c4abff]/20">
                      WinnerPicked event received
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      Raffle Closed
                    </h2>
                  </div>
                  <div className="text-left md:text-right shrink-0 mt-2 md:mt-0">
                    <span className="font-mono text-sm text-[#8c909f] block">
                      Selected at 14:22 UTC
                    </span>
                    <span className="font-mono text-sm text-[#4edea3] font-semibold">
                      Verified on Etherscan
                    </span>
                  </div>
                </div>
                <div className="py-8 border-y border-white/5 flex flex-col items-center justify-center text-center w-full min-w-0">
                  <span className="text-xs font-semibold text-[#d0bcff] uppercase tracking-[0.2em] mb-4">
                    The Winner Is
                  </span>
                  <div className="flex flex-col items-center gap-4 w-full min-w-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#d0bcff] to-[#adc6ff] flex items-center justify-center mb-2 shadow-lg shrink-0">
                      <Trophy className="h-10 w-10 text-white fill-white/20" />
                    </div>
                    <span className="text-2xl md:text-4xl font-extrabold text-[#d0bcff] neon-text-purple tracking-tight break-all px-4 max-w-full block">
                      🎉 Winner: {formatAddress(recentWinner)}
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0">
                  <div className="glass-card-dashboard bg-[#191c1f]/60 backdrop-blur-sm p-4 rounded-lg border border-white/5 w-full min-w-0">
                    <p className="text-xs font-semibold text-[#8c909f] mb-1">
                      Prize Pool
                    </p>
                    <p className="font-mono text-2xl font-bold text-[#adc6ff]">
                       {poolAmount ?? "0"} ETH
                    </p>
                  </div>
                  <div className="glass-card-dashboard bg-[#191c1f]/60 backdrop-blur-sm p-4 rounded-lg border border-white/5 w-full min-w-0">
                    <p className="text-xs font-semibold text-[#8c909f] mb-1">
                      Total Tickets
                    </p>
                    <p className="font-mono text-2xl font-bold text-[#e1e2e7]">
                      {players?.toString() ?? "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Players List Section */}
            <div className="glass-card-dashboard rounded-xl overflow-hidden border border-white/5 bg-[#1d2023]/40 backdrop-blur-2xl w-full min-w-0">
              <div className="p-6 border-b border-white/5 flex justify-between items-center w-full min-w-0">
                <h3 className="text-2xl font-bold text-[#e1e2e7]">Participants</h3>
                <span className="font-mono text-sm text-[#c2c6d6]">
                  1,248 Players
                </span>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead className="bg-[#323538]/30">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold text-[#8c909f] uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-[#8c909f] uppercase tracking-wider">
                        Tickets
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-[#8c909f] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-[#8c909f] uppercase tracking-wider text-right">
                        Probability
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="bg-[#d0bcff]/5">
                      <td className="px-6 py-4 font-mono text-sm text-[#d0bcff]">
                        0x9f...8a2b
                      </td>
                      <td className="px-6 py-4 text-sm text-[#e1e2e7]">50</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-[#d0bcff] text-xs font-semibold">
                          <Star className="h-3.5 w-3.5 text-[#d0bcff] fill-[#d0bcff]" />
                          Winner
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-sm text-[#c2c6d6]">
                        4.01%
                      </td>
                    </tr>
                    {[
                      {
                        address: "0x7a...c4e1",
                        tickets: 120,
                        status: "Participant",
                        probability: "9.61%",
                      },
                      {
                        address: "0x2d...f902",
                        tickets: 10,
                        status: "Participant",
                        probability: "0.80%",
                      },
                      {
                        address: "0xe4...bb11",
                        tickets: 85,
                        status: "Participant",
                        probability: "6.81%",
                      },
                    ].map((player, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-mono text-sm text-[#e1e2e7]">
                          {player.address}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#e1e2e7]">
                          {player.tickets}
                        </td>
                        <td className="px-6 py-4 text-xs text-[#8c909f] font-semibold">
                          {player.status}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-sm text-[#c2c6d6]">
                          {player.probability}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 text-center border-t border-white/5 w-full min-w-0">
                <button className="text-[#adc6ff] font-semibold hover:underline text-sm transition-all cursor-pointer">
                  View All Participants
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 w-full min-w-0">
            {/* Raffle Details */}
            <div className="glass-card-dashboard rounded-xl p-6 space-y-4 border border-white/5 bg-[#1d2023]/40 backdrop-blur-2xl w-full min-w-0">
              <h4 className="text-xl font-bold text-[#e1e2e7]">
                Raffle Metadata
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm w-full min-w-0">
                  <span className="text-[#8c909f]">Round Number</span>
                  <span className="text-[#e1e2e7] font-mono">#042</span>
                </div>
                <div className="flex justify-between items-center text-sm w-full min-w-0">
                  <span className="text-[#8c909f]">Smart Contract</span>
                  <span className="text-[#adc6ff] font-mono hover:underline cursor-pointer truncate max-w-[150px] md:max-w-none">
                    {formatAddress(RAFFLE_ADDRESS)}
                  </span>
                </div>
              </div>
              <div className="pt-4 w-full min-w-0">
                <img
                  className="w-full h-32 object-cover rounded-lg opacity-60"
                  alt="A futuristic schematic diagram of a blockchain protocol flow"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGHq6gJutOBlldr--xS_lLRMgS_hISqg__1lT9_P_pKFVdDNaAZ5xVMlArqqRYMrnAX_2NC0iQIlEuaoWfnNsmBKxm2isgBlAGjUIId4la-2dRWv3c1UtcFmspEmiSxHGgM880IbmUq1cCPV4bGEingLRtHMfLOBIC2pNOa5aM8SvCk82bAkmEOBqpP0Wh-z_Rbd_AHiV7qa7jfJ2wxJ7pGglGMa2z3kSUj8xwed0F_X82uyPMfoT-w6XWgBj_r1diyVXmgIw2U-6K"
                />
              </div>
            </div>
            {/* Next Raffle Teaser */}
            <div className="glass-card-dashboard rounded-xl p-6 bg-gradient-to-br from-[#1d2023] to-[#323538]/40 border border-[#adc6ff]/20 w-full min-w-0 shadow-lg">
              <div className="flex items-center gap-3 mb-4 w-full min-w-0">
                <div className="bg-[#adc6ff]/20 p-2 rounded-lg shrink-0">
                  <Clock className="h-5 w-5 text-[#adc6ff]" />
                </div>
                <h4 className="text-xl font-bold text-[#adc6ff]">Next Raffle</h4>
              </div>
              <p className="text-sm text-[#c2c6d6] mb-6">
                Round #043 starts in 12 hours. Stake your tokens now for priority access.
              </p>
              <Link href="/raffle">
                <button className="w-full bg-[#adc6ff] text-[#00285d] font-bold py-3.5 rounded-lg shadow-lg hover:shadow-[#adc6ff]/20 transition-all cursor-pointer">
                    Buy Tickets for Next Round
                </button>
              </Link>
            </div>
          </aside>
        </section>
      </main>
      {/* Footer */}
      <Footer />
      {/* Background Atmospheric Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#adc6ff]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#4edea3]/10 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
}