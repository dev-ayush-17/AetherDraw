import Image from "next/image";
import { Coins, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { landingStats } from "@/lib/mock-data";
import Link from "next/link";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBQsbneQpzAkS0HsEl6UXlZroOXsFVGq_gaxsBLJ_z3yibPHKmQFJ6unZMdLcQNmv3zmthL0VGbtykZauTccFUVbASAo0Cnmz9P-jR6L9R9zGea28SqrRqUfPFRQnO30DkaNkvQshjd-rRaYXkrPXVLP63JdzdhoO1-Nvtoez_nDGAhstiGgHvZm2gfqSu88FyePhnWV-jhTqBv43GORwiD0c2OhvAV0G-4FaBTPAEZl7qBttsM-miVoYspQmAg1--2kcF_Bn70-Iq5";

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20">
      <div className="hero-glow top-0 -left-48" aria-hidden="true" />
      <div className="hero-glow hero-glow-purple bottom-0 -right-48" aria-hidden="true" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* Left column — copy, CTAs, stats */}
        <div className="w-full min-w-0 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 mb-6">
            <ShieldCheck className="text-[#adc6ff] text-lg shrink-0" />
            <span className="font-label-mono text-xs sm:text-sm font-medium text-[#adc6ff] uppercase tracking-wide">
              Fully On-Chain Protocol
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
            Aether{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#adc6ff] via-[#d0bcff] to-[#4edea3]">
              Draw
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-xl mb-8 leading-relaxed">
            Decentralized raffle powered by smart contracts and verifiable randomness.
            Experience a fair, transparent, and immutable raffle ecosystem built on
            Ethereum.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="gradient" iconRight>
              Connect Wallet
            </Button>
            <Link href="/raffle">
              <Button variant="secondary">
                Enter Raffle
              </Button>
            </Link>
            
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-16 sm:mt-24">
            <Card className="p-3 sm:p-4 rounded-xl">
              <span className="font-label-mono text-[10px] sm:text-xs text-slate-400 block mb-1 uppercase">
                TOTAL POOL
              </span>
              <span className="text-lg sm:text-2xl font-semibold text-[#adc6ff]">
                {landingStats.totalPool}
              </span>
            </Card>
            <Card className="p-3 sm:p-4 rounded-xl">
              <span className="font-label-mono text-[10px] sm:text-xs text-slate-400 block mb-1 uppercase">
                ACTIVE USERS
              </span>
              <span className="text-lg sm:text-2xl font-semibold text-[#d0bcff]">
                {landingStats.activeUsers}
              </span>
            </Card>
            <Card className="p-3 sm:p-4 rounded-xl">
              <span className="font-label-mono text-[10px] sm:text-xs text-slate-400 block mb-1 uppercase">
                WINNERS
              </span>
              <span className="text-lg sm:text-2xl font-semibold text-[#4edea3]">
                {landingStats.winners}
              </span>
            </Card>
          </div>
        </div>

        {/* Right column — jackpot visual */}
        <div className="w-full min-w-0 relative">
          <div className="relative w-full aspect-square max-w-md mx-auto md:max-w-none">
            <div
              className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl opacity-20"
              aria-hidden="true"
            />

            <div className="floating glass-card absolute inset-0 m-auto w-[80%] h-[60%] rounded-3xl p-1">
              <div className="relative w-full h-full rounded-[20px] overflow-hidden">
                <Image
                  src={HERO_IMAGE}
                  alt="Abstract blockchain visual"
                  fill
                  className="object-cover opacity-80 mix-blend-screen"
                  sizes="(max-width: 768px) 90vw, 45vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111417] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-label-mono text-xs sm:text-sm text-[#adc6ff] uppercase">
                        CURRENT JACKPOT
                      </p>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        {landingStats.currentJackpot}
                      </h3>
                    </div>
                    <div className="h-12 w-12 shrink-0 rounded-full border-2 border-blue-400/20 flex items-center justify-center bg-[#111417]/50 backdrop-blur-md">
                      <Coins className="text-[#adc6ff]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute top-4 right-0 sm:top-8 sm:right-4 floating glass-card px-4 py-3 rounded-2xl shadow-xl z-20"
              style={{ animationDelay: "-1s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                  Live Randomness Draw
                </span>
              </div>
            </div>

            <div
              className="absolute bottom-4 left-0 sm:bottom-8 floating glass-card px-4 py-3 rounded-2xl shadow-xl z-20"
              style={{ animationDelay: "-3s" }}
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-label-mono text-[10px] text-slate-400 uppercase">
                  VERIFIED BY
                </span>
                <span className="text-sm font-bold text-white whitespace-nowrap">
                  Chainlink VRF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
