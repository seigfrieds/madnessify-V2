import { type Song, type Song_Id } from "./Song";

/**
 * TYPES
 */
export type Bracket_RoundNumber = number;

export interface BracketMatch {}

export interface BracketSongMatch extends BracketMatch {
  participants: [Song | null, Song | null];
  winnerId: Song_Id | null;
}

export interface BracketByeMatch extends BracketMatch {
  byeMatch: true;
}

export interface BracketRound {
  roundNumber: Bracket_RoundNumber;
  matches: Array<BracketMatch>;
}

export interface Bracket {
  rounds: Array<BracketRound>;
}

/**
 * OPERATIONS
 */
function isPowerOf2(num: number): boolean {
  return num > 0 && (num & (num - 1)) === 0;
}

function nearestHigherPowerOf2(num: number): number {
  if (num <= 1) return 1;

  return 1 << (32 - Math.clz32(num - 1));
}

function nearestLowerPowerOf2(num: number): number {
  if (num <= 1) return 0;

  return 1 << (31 - Math.clz32(num - 1));
}

export function createBracketFromSongs(songList: Song[]): Bracket {
  const requireByeRound = !isPowerOf2(songList.length);

  return requireByeRound ? createBracketWithByeRound(songList) : createRegularBracket(songList);
}

function createRegularBracket(songList: Song[]): Bracket {
  if (!isPowerOf2(songList.length)) throw Error("Number of songs should be a power of 2");

  const bracketRounds = [];

  const listOfFirstRoundMatches: BracketMatch[] = [];

  for (let i = 0; i < songList.length; i += 2) {
    listOfFirstRoundMatches.push({
      participants: [songList[i], songList[i + 1]],
      winnerId: null,
    });
  }

  bracketRounds.push({
    roundNumber: 1,
    matches: listOfFirstRoundMatches,
  });

  for (let currRound = 2; Math.pow(2, currRound) <= songList.length; currRound++) {
    const numberOfCurrRoundMatches = songList.length / Math.pow(2, currRound);
    const listOfCurrRoundMatches = [];

    for (let i = 0; i < numberOfCurrRoundMatches; i++) {
      listOfCurrRoundMatches.push({
        participants: [null, null],
        winnerId: null,
      });
    }

    bracketRounds.push({
      roundNumber: currRound,
      matches: listOfCurrRoundMatches,
    });
  }

  return {
    rounds: bracketRounds,
  };
}

function createBracketWithByeRound(songList: Song[]): Bracket {
  if (isPowerOf2(songList.length))
    throw Error("Number of songs is a power of 2 - do not need bye round");

  const bracketRounds = [];

  //where are we in the song list currently?
  let songListIndex = 0;

  //FILLING THE BYE ROUND
  const listOfByeRoundMatches: BracketMatch[] = [];

  const totalMatchesInByeRound = Math.floor(nearestHigherPowerOf2(songList.length) / 2);
  const numberOfByeRoundMatches = songList.length - nearestLowerPowerOf2(songList.length); //e.g. if 46 teams -> 46-32 = 14 bye matches
  const numberOfByeRoundFillerMatches = totalMatchesInByeRound - numberOfByeRoundMatches;

  //fill actual bye round matches
  for (
    let currByeRoundMatch = 0;
    currByeRoundMatch < numberOfByeRoundMatches;
    currByeRoundMatch++, songListIndex += 2
  ) {
    listOfByeRoundMatches.push({
      participants: [songList[songListIndex], songList[songListIndex + 1]],
      winnerId: null,
    });
  }

  //fill bye round with empty matches to finish out the round
  for (
    let currFillerMatch = 0;
    currFillerMatch < numberOfByeRoundFillerMatches;
    currFillerMatch++
  ) {
    listOfByeRoundMatches.push({
      byeMatch: true,
    });
  }

  bracketRounds.push({
    roundNumber: 1,
    matches: listOfByeRoundMatches,
  });

  //FILLING NEXT ROUND
  const listOfNextRoundMatches: BracketMatch[] = [];

  const totalMatchesInSecondRound = Math.floor(nearestLowerPowerOf2(songList.length) / 2);

  let numByeRoundWinners = numberOfByeRoundMatches;

  for (let currMatch = 0; currMatch < totalMatchesInSecondRound; currMatch++) {
    const participants: [Song | null, Song | null] = [null, null];

    //if there are no more bye round winners feeding in, start using songList again
    if (numByeRoundWinners-- <= 0) participants[0] = songList[songListIndex++];
    if (numByeRoundWinners-- <= 0) participants[1] = songList[songListIndex++];

    listOfNextRoundMatches.push({
      participants: participants,
      winnerId: null,
    });
  }

  if (listOfNextRoundMatches.length > 0) {
    bracketRounds.push({
      roundNumber: 2,
      matches: listOfNextRoundMatches,
    });
  }

  //FILLING REMAINING ROUNDS
  let numMatchesInRound = Math.floor(totalMatchesInSecondRound / 2);
  let roundNumber = 3;

  while (numMatchesInRound > 0) {
    bracketRounds.push({
      roundNumber: roundNumber++,
      matches: [...Array(numMatchesInRound)].map(() => ({
        participants: [null, null],
        winnerId: null,
      })),
    });

    numMatchesInRound = Math.floor(numMatchesInRound / 2);
  }

  return {
    rounds: bracketRounds,
  };
}
