import type { Player, RaffleData } from "@/types/raffle";

export const MOCK_WALLET_ADDRESS = "0x12...3456";
export const MOCK_NETWORK = "Sepolia";

export const mockPlayers: Player[] = [
  { address: "0x71...f2e", joinedAgo: "2m ago", tickets: 12, status: "participant", probability: "2.88%" },
  { address: "0x3a...9d1", joinedAgo: "5m ago", tickets: 8, status: "participant", probability: "1.92%" },
  { address: "0xde...c0b", joinedAgo: "12m ago", tickets: 15, status: "participant", probability: "3.60%" },
  { address: "0x98...aa1", joinedAgo: "15m ago", tickets: 5, status: "participant", probability: "1.20%" },
  { address: "0x55...b2c", joinedAgo: "18m ago", tickets: 20, status: "participant", probability: "4.80%" },
  { address: "0x4f...e7d", joinedAgo: "22m ago", tickets: 3, status: "participant", probability: "0.72%" },
  { address: "0x2b...a91", joinedAgo: "28m ago", tickets: 10, status: "participant", probability: "2.40%" },
];

export const mockActiveRaffle: RaffleData = {
  title: "Current Mega Raffle",
  entranceFee: "0.05 ETH",
  playersCount: 42,
  poolAmount: "2.10 ETH",
  raffleState: "open",
  contractAddress: "0xABC...123",
  endsIn: "14h 22m",
  previousWinner: {
    address: "0x7d...f9a2",
    prizeAmount: "1.85 ETH",
    verified: true,
  },
};

export const mockWinnerPickedRaffle: RaffleData = {
  title: "Grand Raffle #042",
  entranceFee: "0.05 ETH",
  playersCount: 1248,
  poolAmount: "42.50 ETH",
  raffleState: "winner_picked",
  contractAddress: "0x781...f22b",
  winner: {
    address: "0x9f...8a2b",
    prizeAmount: "42.50 ETH",
    verified: true,
    selectedAt: "14:22 UTC",
  },
};

export const landingStats = {
  totalPool: "$1M+",
  activeUsers: "4k",
  winners: "672",
  currentJackpot: "45.82 ETH",
};
