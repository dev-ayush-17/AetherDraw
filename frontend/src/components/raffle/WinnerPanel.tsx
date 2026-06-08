import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { RaffleData, Winner } from "@/types/raffle";
import { cn } from "@/lib/utils";

interface WinnerPanelProps {
  raffleState: RaffleData["raffleState"];
  winner?: Winner;
  previousWinner?: Winner;
}

export function WinnerPanel({ raffleState, winner, previousWinner }: WinnerPanelProps) {
  if (raffleState === "winner_picked" && winner) {
    return <WinnerPickedPanel winner={winner} />;
  }

  if (previousWinner) {
    return <PreviousWinnerPanel winner={previousWinner} />;
  }

  return null;
}

function PreviousWinnerPanel({ winner }: { winner: Winner }) {
  return (
    <Card variant="dashboard" className="p-lg border-white/5">
      <div className="flex items-center justify-between mb-lg">
        <h3 className="text-headline-md font-semibold text-on-surface">Previous Winner</h3>
        <Icon name="stars" className="text-primary" />
      </div>
      <div className="flex items-center gap-md p-lg bg-surface-container rounded-lg border border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center border border-white/10 relative z-10">
          <Icon name="person" className="text-tertiary" />
        </div>
        <div className="flex flex-col relative z-10">
          <span className="text-label-mono font-label-mono text-on-surface text-lg">
            {winner.address}
          </span>
          <span className="text-label-sm text-on-surface-variant">
            Prize Won: {winner.prizeAmount}
          </span>
        </div>
        {winner.verified && (
          <div className="ml-auto relative z-10">
            <span className="text-tertiary text-label-sm px-md py-xs glass-card-dashboard border-tertiary/20 rounded-full shadow-[0_0_10px_rgba(78,222,163,0.2)]">
              Transaction Verified
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

function WinnerPickedPanel({ winner }: { winner: Winner }) {
  return (
    <Card
      variant="dashboard"
      className={cn("winner-glow rounded-xl p-xl relative overflow-hidden group")}
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full group-hover:bg-secondary/30 transition-all" />
      <div className="relative z-10">
        <div className="flex flex-wrap justify-between items-start gap-md mb-lg">
          <div>
            <span className="bg-secondary-container text-on-secondary-container text-label-sm px-md py-xs rounded-full inline-block mb-sm">
              WinnerPicked event received
            </span>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-semibold text-white">
              Raffle Closed
            </h2>
          </div>
          <div className="text-right">
            {winner.selectedAt && (
              <span className="text-label-mono font-label-mono text-outline block">
                Selected at {winner.selectedAt}
              </span>
            )}
            {winner.verified && (
              <span className="text-label-mono font-label-mono text-tertiary">
                Verified on Etherscan
              </span>
            )}
          </div>
        </div>

        <div className="py-xl border-y border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-label-sm text-secondary uppercase tracking-[0.2em] mb-md">
            The Winner Is
          </span>
          <div className="flex flex-col items-center gap-md">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-secondary to-primary flex items-center justify-center mb-sm shadow-lg">
              <Icon
                name="workspace_premium"
                className="text-white text-4xl"
                filled
              />
            </div>
            <span className="text-display-lg font-bold text-secondary neon-text-purple tracking-tight break-all px-md">
              🎉 Winner: {winner.address}
            </span>
          </div>
        </div>

        <div className="mt-lg grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="glass-card-dashboard bg-surface-container-low p-md rounded-lg">
            <p className="text-label-sm text-outline mb-xs">Prize Pool</p>
            <p className="font-label-mono text-headline-md text-primary">{winner.prizeAmount}</p>
          </div>
          <div className="glass-card-dashboard bg-surface-container-low p-md rounded-lg">
            <p className="text-label-sm text-outline mb-xs">Winner Address</p>
            <p className="font-label-mono text-headline-md text-on-surface truncate">
              {winner.address}
            </p>
          </div>
          <div className="glass-card-dashboard bg-surface-container-low p-md rounded-lg">
            <p className="text-label-sm text-outline mb-xs">Status</p>
            <p className="font-label-mono text-body-md text-tertiary">Confirmed</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
