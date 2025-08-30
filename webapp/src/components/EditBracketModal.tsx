import Button from "./Button.tsx";
import "./EditBracketModal.scss";
import { useEffect, useMemo, useRef } from "react";
import type { Bracket } from "@/domain/Bracket.js";

const createBracketDom = (bracket: Bracket) => {
  const numMatchesInFirstRound = bracket.rounds[0].matches.length;

  if (numMatchesInFirstRound < 32) {
    //2, 4, 8, 16
    return (
      <div id="bracket-is-32-or-less">
        <div id={`bracket-${numMatchesInFirstRound}`}>
          {bracket.rounds.map((round, roundIndex) => (
            <div className="round" key={roundIndex}>
              {round.matches.map((match, matchIndex) => (
                <div className="match" key={matchIndex}>
                  <div className="song-winner">
                    <img className="song-picture" src={match.participants[0].imageUrl} />
                    <p className="song-title">{match.participants[0].title}</p>
                  </div>
                  <div className="song-winner">
                    {match.participants[1] && (
                      <img className="song-picture" src={match.participants[1]?.imageUrl} />
                    )}
                    <p className="song-title">{match.participants[1]?.title ?? "BYE"}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (numMatchesInFirstRound === 32) {
    //32
    return (
      <div id="bracket-is-32-or-less">
        <div id="bracket-16"></div>
        <div id="bracket-16"></div>
        <div id="final-match"></div>
      </div>
    );
  } else {
    //64, 128, 256
    return (
      <div id="bracket-is-over-64">
        <div id={`bracket-${songsLength / 4}`}></div>
        <div id={`bracket-${songsLength / 4}`}></div>
        <div id={`bracket-${songsLength / 4}`}></div>
        <div id={`bracket-${songsLength / 4}`}></div>
        <div id="final-four"></div>
      </div>
    );
  }
};

interface Props {
  bracket: Bracket;
  onSwapSongs: (songIndex1: number, songIndex2: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

function EditBracketModal({ bracket, onSwapSongs, isOpen, onClose }: Props) {
  const bracketDom = useMemo(() => createBracketDom(bracket), [bracket]);

  // #region Modal opening
  const modalRef = useRef<HTMLDialogElement>(null!);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);
  // #endregion

  return (
    <dialog ref={modalRef} onClose={onClose}>
      <div id="modal-content">
        <div id="modal-header">
          <Button onClick={onClose} variant="secondary" size="small">
            X
          </Button>
          <p id="header-text">Edit Bracket</p>
        </div>
        <div id="modal-body">
          <div id="action-bar">
            <Button variant="secondary" size="small">
              ?
            </Button>
            <Button variant="secondary" size="small">
              Shuffle
            </Button>
          </div>
          <div id="bracket-container">{bracketDom}</div>
        </div>
      </div>
    </dialog>
  );
}

export default EditBracketModal;
