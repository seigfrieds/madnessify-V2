import { Song, type Song_Id } from "./Song";

export interface BracketMatch {
  participants: [Song, Song];
  winnerId: Song_Id | null;
}

export interface BracketRound {
  matches: Array<BracketMatch>;
}

export interface Bracket {
  rounds: Array<BracketRound>;
}
