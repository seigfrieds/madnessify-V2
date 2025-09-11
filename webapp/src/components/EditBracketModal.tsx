import Button from "./Button.tsx";
import "./EditBracketModal.scss";
import { useEffect, useRef } from "react";
import { type Bracket as BracketType } from "@/domain/Bracket.js";
import Bracket from "./Bracket.tsx";

interface Props {
  bracket: BracketType;
  onSwapSongs: (songIndex1: number, songIndex2: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

function EditBracketModal({ bracket, onSwapSongs, isOpen, onClose }: Props) {
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
          <div id="bracket-container">
            <Bracket bracket={bracket} />
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default EditBracketModal;
