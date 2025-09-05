import { type Song, type Song_Id } from "./Song";

/**
 * TYPES
 */
export interface BracketMatch {}

export interface BracketSongMatch extends BracketMatch {
  participants: [Song_Id | null, Song_Id | null];
  winnerId: Song_Id | null;
}

export interface BracketByeMatch extends BracketMatch {
  byeMatch: true;
  winnerId: Song_Id;
}

export interface Bracket {
  songsInBracket: Array<Song>;
  matches: Array<BracketMatch>;
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

function countRounds(numberOfParticipants: number) {
  return Math.ceil(Math.log2(numberOfParticipants));
}

export function createBracketFromSongs(songList: Song[]): Bracket {
  const requireByeRound = !isPowerOf2(songList.length);

  return requireByeRound ? createBracketWithByeRound(songList) : createRegularBracket(songList);
}

function createRegularBracket(songList: Song[]): Bracket {
  if (!isPowerOf2(songList.length)) throw Error("Number of songs should be a power of 2");

  const bracketMatches: BracketMatch[] = [];

  for (let i = 0; i < songList.length; i += 2) {
    bracketMatches.push({
      participants: [songList[i].id, songList[i + 1]?.id ?? null],
      winnerId: null,
    });
  }

  const numberOfRounds = countRounds(songList.length);
  for (let currRound = 2; currRound <= numberOfRounds; currRound++) {
    const numberOfCurrRoundMatches = songList.length / Math.pow(2, currRound);

    for (let i = 0; i < numberOfCurrRoundMatches; i++) {
      bracketMatches.push({
        participants: [null, null],
        winnerId: null,
      });
    }
  }

  return {
    songsInBracket: songList,
    matches: bracketMatches,
  };
}

function createBracketWithByeRound(songList: Song[]): Bracket {
  if (isPowerOf2(songList.length))
    throw Error("Number of songs is a power of 2 - do not need bye round");

  const bracketMatches: (BracketSongMatch | BracketByeMatch)[] = [];

  //FILLING THE FIRST ROUND
  let songListIndex = 0; //where are we in the song list currently?
  const totalMatchesInFirstRound = Math.floor(nearestHigherPowerOf2(songList.length) / 2);
  const numberOfFirstRoundSongMatches = songList.length - nearestLowerPowerOf2(songList.length); //e.g. if 46 teams -> 46-32 = 14 bye matches
  const numberOfFirstRoundByeMatches = totalMatchesInFirstRound - numberOfFirstRoundSongMatches;

  //fill matches with actual songs
  for (
    let currFirstRoundMatch = 0;
    currFirstRoundMatch < numberOfFirstRoundSongMatches;
    currFirstRoundMatch++, songListIndex += 2
  ) {
    bracketMatches.push({
      participants: [songList[songListIndex].id, songList[songListIndex + 1].id],
      winnerId: null,
    });
  }

  //fill rest of round with bye matches
  for (
    let currByeRoundMatch = 0;
    currByeRoundMatch < numberOfFirstRoundByeMatches;
    currByeRoundMatch++
  ) {
    bracketMatches.push({
      byeMatch: true,
      winnerId: songList[songListIndex++].id,
    });
  }

  //FILLING REMAINING ROUNDS (if needed)
  const numberOfRounds = countRounds(songList.length);
  let numberOfMatchesInEachRound = [];
  let indicesForStartOfEachRound = [];

  for (let i = numberOfRounds; i >= 1; i--) {
    numberOfMatchesInEachRound.push(Math.pow(2, i) / 2);
  }

  for (let i = 0; i < numberOfRounds; i++) {
    indicesForStartOfEachRound.push(
      numberOfMatchesInEachRound.reduce(
        (acc, currVal, currIdx) => (currIdx < i ? acc + currVal : acc),
        0,
      ),
    );
  }

  //2nd round onwards
  for (let currRoundIndex = 1; currRoundIndex < numberOfRounds; currRoundIndex++) {
    const numberOfMatchesInCurrRound = numberOfMatchesInEachRound[currRoundIndex];

    for (
      let currMatchInRound = 0;
      currMatchInRound < numberOfMatchesInCurrRound;
      currMatchInRound++
    ) {
      const leftIndex = indicesForStartOfEachRound[currRoundIndex - 1] + currMatchInRound * 2;
      const rightIndex =
        indicesForStartOfEachRound[currRoundIndex - 1] + (currMatchInRound * 2 + 1);

      bracketMatches.push({
        participants: [bracketMatches[leftIndex].winnerId, bracketMatches[rightIndex].winnerId],
        winnerId: null,
      });
    }
  }

  return {
    songsInBracket: songList,
    matches: bracketMatches,
  };
}
