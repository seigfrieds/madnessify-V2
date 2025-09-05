import { describe, test, expect } from "vitest";
import { createBracketFromSongs, type Bracket } from "./Bracket.ts";
import type { Song } from "./Song.ts";

//TODO: should this be on the frontend?

//create 256 demo songs for usage
const songs: Song[] = [];
for (let i = 1; i <= 256; i++) {
  songs.push({
    id: `songId${i}`,
    title: `songTitle${i}`,
    mainArtistName: `songMainArtistName${i}`,
    imageUrl: `songImageUrl${i}`,
  });
}

describe("bracket creation from list of songs", () => {
  test("empty song list -> empty bracket", () => {
    const inputSongList: Song[] = [];

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("1 song list", () => {
    const inputSongList: Song[] = [songs[0]];

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("2 song list", () => {
    const inputSongList: Song[] = [songs[0], songs[1]];

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("3 song list -> creates 1 bye", () => {
    const inputSongList: Song[] = [songs[0], songs[1], songs[2]];

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          byeMatch: true,
          winnerId: songs[2].id,
        },
        {
          participants: [null, songs[2].id],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("4 song list", () => {
    const inputSongList: Song[] = [songs[0], songs[1], songs[2], songs[3]];

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          participants: [songs[2].id, songs[3].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("5 song list -> creates 3 byes", () => {
    const inputSongList: Song[] = [songs[0], songs[1], songs[2], songs[3], songs[4]];

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          byeMatch: true,
          winnerId: songs[2].id,
        },
        {
          byeMatch: true,
          winnerId: songs[3].id,
        },
        {
          byeMatch: true,
          winnerId: songs[4].id,
        },
        {
          participants: [null, songs[2].id],
          winnerId: null,
        },
        {
          participants: [songs[3].id, songs[4].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("6 song list -> creates 2 byes", () => {
    const inputSongList: Song[] = [songs[0], songs[1], songs[2], songs[3], songs[4], songs[5]];

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          participants: [songs[2].id, songs[3].id],
          winnerId: null,
        },
        {
          byeMatch: true,
          winnerId: songs[4].id,
        },
        {
          byeMatch: true,
          winnerId: songs[5].id,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [songs[4].id, songs[5].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("7 song list -> creates 1 bye", () => {
    const inputSongList: Song[] = songs.slice(0, 7);

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          participants: [songs[2].id, songs[3].id],
          winnerId: null,
        },
        {
          participants: [songs[4].id, songs[5].id],
          winnerId: null,
        },
        {
          byeMatch: true,
          winnerId: songs[6].id,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, songs[6].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("8 song list", () => {
    const inputSongList: Song[] = songs.slice(0, 8);

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          participants: [songs[2].id, songs[3].id],
          winnerId: null,
        },
        {
          participants: [songs[4].id, songs[5].id],
          winnerId: null,
        },
        {
          participants: [songs[6].id, songs[7].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("9 song list -> creates 7 byes", () => {
    const inputSongList: Song[] = songs.slice(0, 9);

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          byeMatch: true,
          winnerId: songs[2].id,
        },
        {
          byeMatch: true,
          winnerId: songs[3].id,
        },
        {
          byeMatch: true,
          winnerId: songs[4].id,
        },
        {
          byeMatch: true,
          winnerId: songs[5].id,
        },
        {
          byeMatch: true,
          winnerId: songs[6].id,
        },
        {
          byeMatch: true,
          winnerId: songs[7].id,
        },
        {
          byeMatch: true,
          winnerId: songs[8].id,
        },
        {
          participants: [null, songs[2].id],
          winnerId: null,
        },
        {
          participants: [songs[3].id, songs[4].id],
          winnerId: null,
        },
        {
          participants: [songs[5].id, songs[6].id],
          winnerId: null,
        },
        {
          participants: [songs[7].id, songs[8].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("10 song list -> creates 6 byes", () => {
    const inputSongList: Song[] = songs.slice(0, 10);

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          participants: [songs[2].id, songs[3].id],
          winnerId: null,
        },
        {
          byeMatch: true,
          winnerId: songs[4].id,
        },
        {
          byeMatch: true,
          winnerId: songs[5].id,
        },
        {
          byeMatch: true,
          winnerId: songs[6].id,
        },
        {
          byeMatch: true,
          winnerId: songs[7].id,
        },
        {
          byeMatch: true,
          winnerId: songs[8].id,
        },
        {
          byeMatch: true,
          winnerId: songs[9].id,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [songs[4].id, songs[5].id],
          winnerId: null,
        },
        {
          participants: [songs[6].id, songs[7].id],
          winnerId: null,
        },
        {
          participants: [songs[8].id, songs[9].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("11 song list -> creates 5 byes", () => {
    const inputSongList: Song[] = songs.slice(0, 11);

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          participants: [songs[2].id, songs[3].id],
          winnerId: null,
        },
        {
          participants: [songs[4].id, songs[5].id],
          winnerId: null,
        },
        {
          byeMatch: true,
          winnerId: songs[6].id,
        },
        {
          byeMatch: true,
          winnerId: songs[7].id,
        },
        {
          byeMatch: true,
          winnerId: songs[8].id,
        },
        {
          byeMatch: true,
          winnerId: songs[9].id,
        },
        {
          byeMatch: true,
          winnerId: songs[10].id,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, songs[6].id],
          winnerId: null,
        },
        {
          participants: [songs[7].id, songs[8].id],
          winnerId: null,
        },
        {
          participants: [songs[9].id, songs[10].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("12 song list -> creates 4 byes", () => {
    const inputSongList: Song[] = songs.slice(0, 12);

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          participants: [songs[2].id, songs[3].id],
          winnerId: null,
        },
        {
          participants: [songs[4].id, songs[5].id],
          winnerId: null,
        },
        {
          participants: [songs[6].id, songs[7].id],
          winnerId: null,
        },
        {
          byeMatch: true,
          winnerId: songs[8].id,
        },
        {
          byeMatch: true,
          winnerId: songs[9].id,
        },
        {
          byeMatch: true,
          winnerId: songs[10].id,
        },
        {
          byeMatch: true,
          winnerId: songs[11].id,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [songs[8].id, songs[9].id],
          winnerId: null,
        },
        {
          participants: [songs[10].id, songs[11].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("13 song list -> creates 3 byes", () => {
    const inputSongList: Song[] = songs.slice(0, 13);

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          participants: [songs[2].id, songs[3].id],
          winnerId: null,
        },
        {
          participants: [songs[4].id, songs[5].id],
          winnerId: null,
        },
        {
          participants: [songs[6].id, songs[7].id],
          winnerId: null,
        },
        {
          participants: [songs[8].id, songs[9].id],
          winnerId: null,
        },
        {
          byeMatch: true,
          winnerId: songs[10].id,
        },
        {
          byeMatch: true,
          winnerId: songs[11].id,
        },
        {
          byeMatch: true,
          winnerId: songs[12].id,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, songs[10].id],
          winnerId: null,
        },
        {
          participants: [songs[11].id, songs[12].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("14 song list -> creates 2 byes", () => {
    const inputSongList: Song[] = songs.slice(0, 14);

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          participants: [songs[2].id, songs[3].id],
          winnerId: null,
        },
        {
          participants: [songs[4].id, songs[5].id],
          winnerId: null,
        },
        {
          participants: [songs[6].id, songs[7].id],
          winnerId: null,
        },
        {
          participants: [songs[8].id, songs[9].id],
          winnerId: null,
        },
        {
          participants: [songs[10].id, songs[11].id],
          winnerId: null,
        },
        {
          byeMatch: true,
          winnerId: songs[12].id,
        },
        {
          byeMatch: true,
          winnerId: songs[13].id,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [songs[12].id, songs[13].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("15 song list -> creates 1 bye", () => {
    const inputSongList: Song[] = songs.slice(0, 15);

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          participants: [songs[2].id, songs[3].id],
          winnerId: null,
        },
        {
          participants: [songs[4].id, songs[5].id],
          winnerId: null,
        },
        {
          participants: [songs[6].id, songs[7].id],
          winnerId: null,
        },
        {
          participants: [songs[8].id, songs[9].id],
          winnerId: null,
        },
        {
          participants: [songs[10].id, songs[11].id],
          winnerId: null,
        },
        {
          participants: [songs[12].id, songs[13].id],
          winnerId: null,
        },
        {
          byeMatch: true,
          winnerId: songs[14].id,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, songs[14].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });

  test("16 song list", () => {
    const inputSongList: Song[] = songs.slice(0, 16);

    const expectedBracket: Bracket = {
      songsInBracket: inputSongList,
      matches: [
        {
          participants: [songs[0].id, songs[1].id],
          winnerId: null,
        },
        {
          participants: [songs[2].id, songs[3].id],
          winnerId: null,
        },
        {
          participants: [songs[4].id, songs[5].id],
          winnerId: null,
        },
        {
          participants: [songs[6].id, songs[7].id],
          winnerId: null,
        },
        {
          participants: [songs[8].id, songs[9].id],
          winnerId: null,
        },
        {
          participants: [songs[10].id, songs[11].id],
          winnerId: null,
        },
        {
          participants: [songs[12].id, songs[13].id],
          winnerId: null,
        },
        {
          participants: [songs[14].id, songs[15].id],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
        {
          participants: [null, null],
          winnerId: null,
        },
      ],
    };
    const actualBracket = createBracketFromSongs(inputSongList);

    const expectedBracketString = JSON.stringify(expectedBracket);
    const actualBracketString = JSON.stringify(actualBracket);

    expect(actualBracketString).toEqual(expectedBracketString);
  });
});
