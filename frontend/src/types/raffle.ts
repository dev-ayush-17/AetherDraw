export type RaffleState = "open" | "closed" | "winner_picked";

export interface Player {
  address: string;
  joinedAgo: string;
  tickets?: number;
  status?: "participant" | "winner";
  probability?: string;
}

export interface Winner {
  address: string;
  prizeAmount: string;
  verified?: boolean;
  selectedAt?: string;
}

export interface RaffleData {
  title: string;
  entranceFee: string;
  playersCount: number;
  poolAmount: string;
  raffleState: RaffleState;
  contractAddress: string;
  endsIn?: string;
  winner?: Winner;
  previousWinner?: Winner;
}
