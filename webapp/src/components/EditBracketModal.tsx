import Button from "./Button.tsx";
import "./EditBracketModal.scss";
import { useEffect, useMemo, useRef } from "react";
import type { Song } from "@/domain/Song.js";
import type { Bracket } from "@/domain/Bracket.js";

const createBracket = (songs: Song[]) => {
  const songsLength = songs.length;

  const songsGroupedIntoMatches = [];
  for (let i = 0; i < songsLength; i += 2) {
    songsGroupedIntoMatches.push(songs.slice(i, i + 2));
  }

  if (songsLength < 32) {
    //2, 4, 8, 16
    return (
      <div id="bracket-is-32-or-less">
        <div id={`bracket-${songsLength}`}>
          <div className="round">
            {songsGroupedIntoMatches.map((match, index) => (
              <div className="match" key={index}>
                <div className="song-winner">
                  <img className="song-picture" src={match[0].imageUrl} />
                  <p className="song-title">{match[0].title}</p>
                </div>
                <div className="song-winner">
                  {match[1] && <img className="song-picture" src={match[1]?.imageUrl} />}
                  <p className="song-title">{match[1]?.title ?? "BYE"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (songsLength === 32) {
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
  songs: Bracket[];
  onSwapSongs: (songIndex1: number, songIndex2: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

function EditBracketModal({ songs, onSwapSongs, isOpen, onClose }: Props) {
  const bracketDom = useMemo(() => createBracket(songs), [songs]);

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
