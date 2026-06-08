import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Dices,
  Lock,
  Shield,
  Wallet,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const STAKING_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAWy6_aIa4S2ABMepSpTtIYVMo-GfwGPChu7shU7ml6vIyl4LP_SEYUnHA9ZBHdp6kEHPpYxiY9qVn4VSEYUUSaAHr6-DrYMBK5PDxj0CHberBY5TP54VEISe8PRohSTkca-v1rWbkev2ngpPZrlnjsttA1PpsrlftPEBJS7w7BPRoXAJk0xE_iNhrXqbwrkdF3z0EiA_P783AX-Rg_UIJLhKzP7kCivWcJWGpUsWBNLCKesak6ZG7MgO6lKKx9fYE2PyZbVOY089uY";

const payoutIcons = [
  { id: "bolt", Icon: Zap, color: "text-[#adc6ff]" },
  { id: "lock", Icon: Lock, color: "text-[#d0bcff]" },
  { id: "check", Icon: Check, color: "text-[#4edea3]" },
] as const;

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <h2 className="text-3xl lg:text-4xl font-semibold text-white text-center mb-8 lg:mb-10">
        The Future of Fairness
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
        <Card className="p-6 lg:p-8 rounded-3xl md:col-span-2 relative overflow-hidden group min-h-[200px]">
          <div className="relative z-10 max-w-md">
            <Shield className="text-[#adc6ff] text-5xl mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Secure Staking Mechanics</h3>
            <p className="text-base text-slate-300 leading-relaxed">
              Lock your tickets in the staking pool to earn protocol fees and boost your
              winning probabilities through long-term loyalty rewards.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
            <Image
              src={STAKING_IMAGE}
              alt="Staking UI preview"
              fill
              className="object-cover object-left"
              sizes="50vw"
            />
          </div>
        </Card>

        <Card className="p-6 lg:p-8 rounded-3xl group hover:border-emerald-400/30 transition-colors">
          <Dices className="text-[#4edea3] text-5xl mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">Verifiable Luck</h3>
          <p className="text-base text-slate-300 leading-relaxed">
            Every winner is selected using Chainlink VRF, ensuring 100% tamper-proof
            randomness that anyone can verify on-chain.
          </p>
        </Card>

        <Card className="p-6 lg:p-8 rounded-3xl flex flex-col justify-between group">
          <div>
            <Wallet className="text-[#d0bcff] text-5xl mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Instant Payouts</h3>
            <p className="text-base text-slate-300 leading-relaxed">
              No manual withdrawals. Smart contracts automatically distribute prizes
              directly to winner&apos;s wallets immediately after each draw.
            </p>
          </div>
          <div className="mt-8 h-24 bg-[#1d2023] rounded-xl flex items-center justify-center overflow-hidden">
            <div className="flex -space-x-4">
              {payoutIcons.map(({ id, Icon, color }) => (
                <div
                  key={id}
                  className="w-12 h-12 rounded-full border-2 border-[#111417] bg-[#37393d] flex items-center justify-center"
                >
                  <Icon className={`${color} text-sm`} />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 lg:p-8 rounded-3xl md:col-span-2 relative overflow-hidden group">
          <div className="relative z-10 max-w-lg">
            <h3 className="text-2xl font-semibold text-white mb-2">Community Governance</h3>
            <p className="text-base text-slate-300 leading-relaxed">
              Protocol changes and treasury management are decided by $LOTT token holders
              through a transparent DAO structure. Your vote shapes the future of the
              lottery.
            </p>
            <button
              type="button"
              className="mt-6 text-[#adc6ff] font-bold flex items-center gap-1 text-base"
            >
              Learn about DAO <ArrowUpRight />
            </button>
          </div>
          <div
            className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors pointer-events-none"
            aria-hidden="true"
          />
        </Card>
      </div>
    </section>
  );
}
