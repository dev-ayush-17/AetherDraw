import { Card } from "@/components/ui/Card";
import { CopyAddressButton } from "@/components/ui/CopyAddressButton";
import { Icon } from "@/components/ui/Icon";
import type { RaffleData } from "@/types/raffle";
import { cn } from "@/lib/utils";

interface RaffleCardProps {
  raffle: RaffleData;
  isLoading?: boolean;
  isDisabled?: boolean;
}

function stateLabel(state: RaffleData["raffleState"]) {
  switch (state) {
    case "open":
      return "Open";
    case "closed":
      return "Closed";
    case "winner_picked":
      return "Winner Picked";
    default:
      return "Open";
  }
}

function stateBadgeClass(state: RaffleData["raffleState"]) {
  switch (state) {
    case "open":
      return "bg-tertiary/20 text-tertiary border-tertiary/30";
    case "closed":
      return "bg-outline/20 text-outline border-outline/30";
    case "winner_picked":
      return "bg-secondary-container/30 text-secondary border-secondary/30";
    default:
      return "bg-tertiary/20 text-tertiary border-tertiary/30";
  }
}

export function RaffleCard({
  raffle,
  isLoading = false,
  isDisabled = false,
}: RaffleCardProps) {
  const isOpen = raffle.raffleState === "open";

  return (
    <Card variant="dashboard" className="p-xl relative overflow-hidden group">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-tertiary/10 rounded-full blur-[80px]" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-xl relative z-10">
        <div>
          <h2 className="text-display-lg font-bold text-gradient">{raffle.title}</h2>
          <div className="flex items-center gap-sm mt-xs flex-wrap">
            <span
              className={cn(
                "px-md py-xs text-label-sm rounded-full border",
                stateBadgeClass(raffle.raffleState),
              )}
            >
              State: {stateLabel(raffle.raffleState)}
            </span>
            {raffle.endsIn && isOpen && (
              <span className="text-on-surface-variant text-body-md">
                • Ends in {raffle.endsIn}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <span className="text-on-surface-variant text-label-sm mb-xs">
            Contract Address
          </span>
          <div className="flex items-center gap-sm glass-card-dashboard px-md py-sm rounded-lg border-white/5">
            <code className="text-label-mono font-label-mono text-primary">
              {raffle.contractAddress}
            </code>
            <CopyAddressButton address={raffle.contractAddress} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl relative z-10">
        <div className="flex flex-col gap-xs p-lg glass-card-dashboard rounded-lg border-white/5">
          <span className="text-on-surface-variant text-label-sm">Entrance Fee</span>
          <span className="text-headline-md font-semibold text-on-surface">
            {raffle.entranceFee}
          </span>
        </div>
        <div className="flex flex-col gap-xs p-lg glass-card-dashboard rounded-lg border-white/5">
          <span className="text-on-surface-variant text-label-sm">Total Players</span>
          <span className="text-headline-md font-semibold text-on-surface">
            {raffle.playersCount}
          </span>
        </div>
        <div className="flex flex-col gap-xs p-lg glass-card-dashboard rounded-lg border-white/5">
          <span className="text-on-surface-variant text-label-sm">Pool Amount</span>
          <span className="text-headline-md font-semibold text-tertiary">
            {raffle.poolAmount}
          </span>
        </div>
      </div>

      <div className="relative z-10">
        <button
          type="button"
          disabled={!isOpen || isDisabled || isLoading}
          className={cn(
            "w-full bg-primary text-on-primary-container text-headline-md font-semibold py-xl rounded-xl glowing-primary transition-all active:scale-[0.98] flex items-center justify-center gap-md",
            (!isOpen || isDisabled) && "opacity-50 cursor-not-allowed",
            isLoading && "opacity-70 cursor-wait",
          )}
        >
          {isLoading ? (
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Icon name="confirmation_number" />
          )}
          Enter Raffle
        </button>
      </div>
    </Card>
  );
}
