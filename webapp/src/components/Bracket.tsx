import { nearestHigherPowerOf2 } from "@/utils/math.ts";
import "./Bracket.scss";
import {
  splitBracketIntoRounds,
  type BracketMatch,
  type Bracket as BracketType,
} from "@/domain/Bracket.ts";
import type { Song } from "@/domain/Song.ts";

const createMatchDom = (match: BracketMatch, songs: Song[]) => {
  if (!match.byeMatch) {
    return (
      <div className="match">
        <div className="song-winner">
          {match.participants[0] ? (
            <>
              <img
                className="song-picture"
                src={songs.find((song) => song.id === match.participants[0])?.imageUrl}
              />
              <p className="song-title">
                {songs.find((song) => song.id === match.participants[0])?.title}
              </p>
            </>
          ) : (
            <>
              <div className="song-picture-empty"></div>
              <p className="song-title"></p>
            </>
          )}
        </div>
        <div className="song-winner">
          {match.participants[1] ? (
            <>
              <img
                className="song-picture"
                src={songs.find((song) => song.id === match.participants[1])?.imageUrl}
              />
              <p className="song-title">
                {songs.find((song) => song.id === match.participants[1])?.title}
              </p>
            </>
          ) : (
            <>
              <div className="song-picture-empty"></div>
              <p className="song-title"></p>
            </>
          )}
        </div>
      </div>
    );
  }

  return <div className="bye-match"></div>;
};

const createBracketDom = (bracket: BracketType) => {
  const numSongs = bracket.songsInBracket.length;
  const bracketRounds = splitBracketIntoRounds(bracket);

  if (numSongs < 32) {
    //2, 4, 8, 16
    return (
      <div id="bracket-is-32-or-less-layout">
        <div id={`bracket-${nearestHigherPowerOf2(numSongs)}`}>
          {bracketRounds.map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) =>
                createMatchDom(
                  match,
                  !match.participants
                    ? []
                    : bracket.songsInBracket.filter((song) => match.participants.includes(song.id)),
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (numSongs === 32) {
    const leftRounds = bracketRounds
      .map((matches) => matches.filter((_, idx) => idx < matches.length / 2))
      .slice(0, -1);
    const rightRounds = bracketRounds
      .map((matches) => matches.filter((_, idx) => idx >= matches.length / 2))
      .slice(0, -1);
    const finalRoundMatches = bracketRounds.pop();

    //32
    return (
      <div id="bracket-is-32-or-less-layout">
        <div id="bracket-16">
          {leftRounds.map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) =>
                createMatchDom(
                  match,
                  !match.participants
                    ? []
                    : bracket.songsInBracket.filter((song) => match.participants.includes(song.id)),
                ),
              )}
            </div>
          ))}
        </div>
        <div id="bracket-16">
          {rightRounds.reverse().map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) =>
                createMatchDom(
                  match,
                  !match.participants
                    ? []
                    : bracket.songsInBracket.filter((song) => match.participants.includes(song.id)),
                ),
              )}
            </div>
          ))}
        </div>
        <div id="final-match">
          <div className="round">
            {finalRoundMatches.map((match, matchIndex) =>
              createMatchDom(
                match,
                !match.participants
                  ? []
                  : bracket.songsInBracket.filter((song) => match.participants.includes(song.id)),
              ),
            )}
          </div>
        </div>
      </div>
    );
  } else {
    const topLeftRounds = bracketRounds
      .map((matches) => matches.slice(0, matches.length / 4))
      .slice(0, -2);
    const topRightRounds = bracketRounds
      .map((matches) => matches.slice(matches.length / 4, matches.length / 2))
      .slice(0, -2);
    const bottomLeftRounds = bracketRounds
      .map((matches) => matches.slice(matches.length / 2, (matches.length / 4) * 3))
      .slice(0, -2);
    const bottomRightRounds = bracketRounds
      .map((matches) => matches.slice((matches.length / 4) * 3))
      .slice(0, -2);
    const finalRoundMatches = bracket.matches.slice(-3);

    //64, 128, 256
    return (
      <div id="bracket-is-over-64-layout">
        <div id={`bracket-${nearestHigherPowerOf2(numSongs) / 4}`}>
          {topLeftRounds.map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) =>
                createMatchDom(
                  match,
                  !match.participants
                    ? []
                    : bracket.songsInBracket.filter((song) => match.participants.includes(song.id)),
                ),
              )}
            </div>
          ))}
        </div>
        <div id={`bracket-${nearestHigherPowerOf2(numSongs) / 4}`}>
          {topRightRounds.reverse().map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) =>
                createMatchDom(
                  match,
                  !match.participants
                    ? []
                    : bracket.songsInBracket.filter((song) => match.participants.includes(song.id)),
                ),
              )}
            </div>
          ))}
        </div>
        <div id={`bracket-${nearestHigherPowerOf2(numSongs) / 4}`}>
          {bottomLeftRounds.map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) =>
                createMatchDom(
                  match,
                  !match.participants
                    ? []
                    : bracket.songsInBracket.filter((song) => match.participants.includes(song.id)),
                ),
              )}
            </div>
          ))}
        </div>
        <div id={`bracket-${nearestHigherPowerOf2(numSongs) / 4}`}>
          {bottomRightRounds.reverse().map((roundMatches, roundIndex) => (
            <div className="round" key={roundIndex}>
              {roundMatches.map((match, matchIndex) =>
                createMatchDom(
                  match,
                  !match.participants
                    ? []
                    : bracket.songsInBracket.filter((song) => match.participants.includes(song.id)),
                ),
              )}
            </div>
          ))}
        </div>
        <div id="final-four">
          {createMatchDom(
            finalRoundMatches[0],
            !finalRoundMatches[0].participants
              ? []
              : bracket.songsInBracket.filter((song) =>
                  finalRoundMatches[0].participants.includes(song.id),
                ),
          )}
          {createMatchDom(
            finalRoundMatches[2],
            !finalRoundMatches[2].participants
              ? []
              : bracket.songsInBracket.filter((song) =>
                  finalRoundMatches[2].participants.includes(song.id),
                ),
          )}
          {createMatchDom(
            finalRoundMatches[1],
            !finalRoundMatches[1].participants
              ? []
              : bracket.songsInBracket.filter((song) =>
                  finalRoundMatches[1].participants.includes(song.id),
                ),
          )}
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
