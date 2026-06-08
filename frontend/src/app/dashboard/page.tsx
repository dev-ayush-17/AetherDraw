import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PlayersList } from "@/components/raffle/PlayersList";
import { RaffleCard } from "@/components/raffle/RaffleCard";
import { StatsBento } from "@/components/raffle/StatsBento";
import { WinnerPanel } from "@/components/raffle/WinnerPanel";
import { mockActiveRaffle, mockPlayers } from "@/lib/mock-data";

export default function DashboardPage() {
  const raffle = mockActiveRaffle;
  const players = mockPlayers;

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden">
      <Navbar variant="dashboard" />

      <main className="flex-grow w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-8 flex flex-col gap-gutter">
            <RaffleCard raffle={raffle} />
            <WinnerPanel
              raffleState={raffle.raffleState}
              winner={raffle.winner}
              previousWinner={raffle.previousWinner}
            />
          </div>

          <PlayersList players={players} />
        </section>

        <StatsBento />
      </main>

      <Footer />

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-tertiary/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
