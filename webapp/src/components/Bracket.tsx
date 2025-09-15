import { nearestHigherPowerOf2 } from "@/utils/math.ts";
import "./Bracket.scss";
import {
  isByeMatch,
  splitBracketIntoRounds,
  type BracketMatch,
  type Bracket as BracketType,
} from "@/domain/Bracket.ts";
import type { Song, Song_Id } from "@/domain/Song.ts";
import { Fragment } from "react/jsx-runtime";

const createByeMatchDom = () => {
  return <div className="bye-match"></div>;
};

const createSongMatchDom = (
  songOne: Song | null,
  songTwo: Song | null,
  winnerId: Song_Id | null,
) => {
  const songOneIsWinner = songOne?.id === winnerId;
  const songTwoIsWinner = songTwo?.id === winnerId;

  return (
    <div className="match">
      {songOne ? (
        <div className={`song-${songOneIsWinner ? "winner" : "loser"}`}>
          <img className="song-picture" src={songOne.imageUrl} />
          <p className="song-title">{songOne.title}</p>
        </div>
      ) : (
        <div className="song-empty"></div>
      )}

      {songTwo ? (
        <div className={`song-${songTwoIsWinner ? "winner" : "loser"}`}>
          <img className="song-picture" src={songTwo.imageUrl} />
          <p className="song-title">{songTwo.title}</p>
        </div>
      ) : (
        <div className="song-empty"></div>
      )}
    </div>
  );
};

const createBracketDom = (bracket: BracketType) => {
  const numSongs = bracket.songsInBracket.length;
  const bracketRounds = splitBracketIntoRounds(bracket);

  const createMatchDom = (match: BracketMatch) => {
    return isByeMatch(match)
      ? createByeMatchDom()
      : createSongMatchDom(
          bracket.songsInBracket.find((song) => match.participants[0]?.includes(song.id)) ?? null,
          bracket.songsInBracket.find((song) => match.participants[1]?.includes(song.id)) ?? null,
          match.winnerId,
        );
  };

  if (numSongs < 16) {
    //less than 16 songs -> only have one region
    const regionSize = Math.max(2, nearestHigherPowerOf2(numSongs));

    return (
      <div id="bracket-is-32-or-less-layout">
        <div id={`region-${regionSize}`}>
          {bracketRounds.map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) => (
                <Fragment key={matchIndex}>{createMatchDom(match)}</Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (numSongs <= 32) {
    //16-32 songs -> two 16 song regions
    //for each region, slice the last round, getting everything EXCEPT the final match
    const leftRounds = bracketRounds
      .map((matches) => matches.filter((_, idx) => idx < matches.length / 2))
      .slice(0, -1);
    const rightRounds = bracketRounds
      .map((matches) => matches.filter((_, idx) => idx >= matches.length / 2))
      .slice(0, -1);

    //get the final match
    const finalRoundMatches = bracketRounds.pop();

    return (
      <div id="bracket-is-32-or-less-layout">
        <div id="region-16">
          {leftRounds.map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) => (
                <Fragment key={matchIndex}>{createMatchDom(match)}</Fragment>
              ))}
            </div>
          ))}
        </div>
        <div id="region-16">
          {rightRounds.reverse().map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) => (
                <Fragment key={matchIndex}>{createMatchDom(match)}</Fragment>
              ))}
            </div>
          ))}
        </div>
        <div id="final-match">
          <div className="round">
            {finalRoundMatches?.map((match, matchIndex) => (
              <Fragment key={matchIndex}>{createMatchDom(match)}</Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    //>32 songs -> divide bracket into 4 regions
    const regionSize = nearestHigherPowerOf2(numSongs) / 4;

    //for each region, slice the last two rounds, since that is the final four
    const topLeftRounds = bracketRounds
      .map((matches) => matches.slice(0, matches.length / 4))
      .slice(0, -2);
    const bottomLeftRounds = bracketRounds
      .map((matches) => matches.slice(matches.length / 4, matches.length / 2))
      .slice(0, -2);
    const topRightRounds = bracketRounds
      .map((matches) => matches.slice(matches.length / 2, (matches.length / 4) * 3))
      .slice(0, -2);
    const bottomRightRounds = bracketRounds
      .map((matches) => matches.slice((matches.length / 4) * 3))
      .slice(0, -2);

    //final four is the last 3 matches
    const finalFourMatches = bracket.matches.slice(-3);
    const finalFourLeftRegionMatch = finalFourMatches[0];
    const finalFourRightRegionMatch = finalFourMatches[1];
    const finalMatch = finalFourMatches[2];

    //64, 128, 256
    return (
      <div id="bracket-is-over-64-layout">
        <div id={`region-${regionSize}`}>
          {topLeftRounds.map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) => (
                <Fragment key={matchIndex}>{createMatchDom(match)}</Fragment>
              ))}
            </div>
          ))}
        </div>
        <div id={`region-${regionSize}`}>
          {topRightRounds.reverse().map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) => (
                <Fragment key={matchIndex}>{createMatchDom(match)}</Fragment>
              ))}
            </div>
          ))}
        </div>
        <div id={`region-${regionSize}`}>
          {bottomLeftRounds.map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) => (
                <Fragment key={matchIndex}>{createMatchDom(match)}</Fragment>
              ))}
            </div>
          ))}
        </div>
        <div id={`region-${regionSize}`}>
          {bottomRightRounds.reverse().map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) => (
                <Fragment key={matchIndex}>{createMatchDom(match)}</Fragment>
              ))}
            </div>
          ))}
        </div>
        <div id="final-four">
          {createMatchDom(finalFourLeftRegionMatch)}
          {createMatchDom(finalMatch)}
          {createMatchDom(finalFourRightRegionMatch)}
        </div>
      </div>
    );
  }
};

interface Props {
  bracket: BracketType;
}

function Bracket({ bracket }: Props) {
  return createBracketDom(bracket);
}

export default Bracket;
