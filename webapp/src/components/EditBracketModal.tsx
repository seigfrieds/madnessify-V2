import Button from "./Button.tsx";
import styles from "./EditBracketModal.module.scss";
import { useEffect, useRef, useState } from "react";
import { createBracketFromSongs, type Bracket as BracketType } from "@/domain/Bracket.js";
import Bracket from "./Bracket.tsx";
import { shuffleArray } from "@/utils/array.ts";

interface Props {
  bracket: BracketType;
  isOpen: boolean;
  onClose: () => void;
}

function EditBracketModal({ bracket, isOpen, onClose }: Props) {
  // #region Bracket management
  const [localBracket, setLocalBracket] = useState<BracketType>(
    createBracketFromSongs(bracket.songsInBracket),
  );

  useEffect(() => {
    setLocalBracket(createBracketFromSongs(bracket.songsInBracket));
  }, [bracket]);

  const onShuffle = () => {
    setLocalBracket(createBracketFromSongs(shuffleArray(localBracket.songsInBracket)));
  };
  // #endregion

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
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <Button onClick={onClose} variant="Secondary" size="Small">
            X
          </Button>
          <p className={styles.headerText}>Edit Bracket</p>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.actionBar}>
            <Button onClick={onShuffle} variant="Secondary" size="Small">
              Shuffle
            </Button>
          </div>
          <div className={styles.bracketContainer}>
            <Bracket bracket={localBracket} />
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default EditBracketModal;
