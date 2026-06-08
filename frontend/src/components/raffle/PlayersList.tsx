import { Card } from "@/components/ui/Card";
import type { Player } from "@/types/raffle";

interface PlayersListProps {
  players: Player[];
}

export function PlayersList({ players }: PlayersListProps) {
  const isEmpty = players.length === 0;

  return (
    <Card
      variant="dashboard"
      className="p-lg flex flex-col h-[600px] border-white/5 lg:col-span-4"
    >
      <div className="flex items-center justify-between mb-lg">
        <h3 className="text-headline-md font-semibold text-on-surface">Recent Players</h3>
        {!isEmpty && (
          <span className="text-label-sm text-primary bg-primary/10 px-md py-xs rounded-full">
            LIVE
          </span>
        )}
      </div>

      <div className="flex-grow overflow-y-auto space-y-sm pr-sm">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-xl opacity-50 h-full">
            <span className="material-symbols-outlined text-display-lg">group_off</span>
            <p className="text-body-md mt-sm">No players yet — be the first!</p>
          </div>
        ) : (
          players.map((player, index) => (
            <div
              key={player.address}
              className="flex items-center justify-between p-md glass-card-dashboard rounded-lg border-white/5 hover:border-primary/20 transition-all cursor-default"
            >
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-xs text-on-surface font-bold">
                  {index + 1}
                </div>
                <span className="text-label-mono font-label-mono text-on-surface">
                  {player.address}
                </span>
              </div>
              <span className="text-label-sm text-on-surface-variant">
                {player.joinedAgo}
              </span>
            </div>
          ))
        )}
      </div>

      {!isEmpty && (
        <button
          type="button"
          className="mt-lg w-full py-md glass-card-dashboard border-white/10 text-on-surface-variant text-label-sm hover:text-primary transition-colors rounded-lg"
        >
          View All Participants
        </button>
      )}
    </Card>
  );
}
