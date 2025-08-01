import type { Song } from "@/domain/Song.js";
import Button from "./Button.tsx";
import "./EditBracketModal.scss";
import { useEffect, useRef } from "react";

const sampleData: Song[] = [
  {
    id: "0",
    title: "Bachelorette - Family Tree Version",
    mainArtistName: "Bjork",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b27361340a8868455be0d958fb39",
  },
  {
    id: "1",
    title: "My Collection!",
    mainArtistName: "Autumn",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b2736f2fbcc6cd529a2017f852b1",
  },
];

const matches2 = (
  <>
    <div className="match">
      <div className="song-winner" key={sampleData[0].id}>
        <img className="song-picture" src={sampleData[0].imageUrl} />
        <p className="song-title">{sampleData[0].title}</p>
      </div>
      <div className="song-loser" key={sampleData[1].id}>
        <img className="song-picture" src={sampleData[1].imageUrl} />
        <p className="song-title">{sampleData[1].title}</p>
      </div>
    </div>
  </>
);

const matches4 = (
  <>
    <>{matches2}</>
    <>{matches2}</>
  </>
);

const matches8 = (
  <>
    <>{matches4}</>
    <>{matches4}</>
  </>
);

const matches16 = (
  <>
    <>{matches8}</>
    <>{matches8}</>
  </>
);

const matches32 = (
  <>
    <>{matches16}</>
    <>{matches16}</>
  </>
);

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function EditBracketModal({ isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null!);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

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
            <div id="bracket-is-32-or-less">
              <div id="bracket-16">
                <div className="round">{matches16}</div>
                <div className="round">{matches8}</div>
                <div className="round">{matches4}</div>
                <div className="round">{matches2}</div>
              </div>
              <div id="bracket-16">
                <div className="round">{matches2}</div>
                <div className="round">{matches4}</div>
                <div className="round">{matches8}</div>
                <div className="round">{matches16}</div>
              </div>
              <div id="final-match">
                <div className="match">
                  <div className="song-winner" key={sampleData[0].id}>
                    <img className="song-picture" src={sampleData[0].imageUrl} />
                    <p className="song-title">{sampleData[0].title}</p>
                  </div>
                  <div className="song-loser" key={sampleData[1].id}>
                    <img className="song-picture" src={sampleData[1].imageUrl} />
                    <p className="song-title">{sampleData[1].title}</p>
                  </div>
                </div>
              </div>
              {/* <div id="bracket-32">
                <div className="round">{matches32}</div>
                <div className="round">{matches16}</div>
                <div className="round">{matches8}</div>
                <div className="round">{matches4}</div>
                <div className="round">{matches2}</div>
              </div>
              <div id="bracket-32">
                <div className="round">{matches2}</div>
                <div className="round">{matches4}</div>
                <div className="round">{matches8}</div>
                <div className="round">{matches16}</div>
                <div className="round">{matches32}</div>
              </div>
              <div id="bracket-32">
                <div className="round">{matches32}</div>
                <div className="round">{matches16}</div>
                <div className="round">{matches8}</div>
                <div className="round">{matches4}</div>
                <div className="round">{matches2}</div>
              </div>
              <div id="bracket-32">
                <div className="round">{matches2}</div>
                <div className="round">{matches4}</div>
                <div className="round">{matches8}</div>
                <div className="round">{matches16}</div>
                <div className="round">{matches32}</div>
              </div>
              <div id="final-four">
                <div className="match">
                  <div className="song-winner" key={sampleData[0].id}>
                    <img className="song-picture" src={sampleData[0].imageUrl} />
                    <p className="song-title">{sampleData[0].title}</p>
                  </div>
                  <div className="song-loser" key={sampleData[1].id}>
                    <img className="song-picture" src={sampleData[1].imageUrl} />
                    <p className="song-title">{sampleData[1].title}</p>
                  </div>
                </div>
                <div className="match">
                  <div className="song-winner" key={sampleData[0].id}>
                    <img className="song-picture" src={sampleData[0].imageUrl} />
                    <p className="song-title">{sampleData[0].title}</p>
                  </div>
                  <div className="song-loser" key={sampleData[1].id}>
                    <img className="song-picture" src={sampleData[1].imageUrl} />
                    <p className="song-title">{sampleData[1].title}</p>
                  </div>
                </div>
                <div className="match">
                  <div className="song-winner" key={sampleData[0].id}>
                    <img className="song-picture" src={sampleData[0].imageUrl} />
                    <p className="song-title">{sampleData[0].title}</p>
                  </div>
                  <div className="song-loser" key={sampleData[1].id}>
                    <img className="song-picture" src={sampleData[1].imageUrl} />
                    <p className="song-title">{sampleData[1].title}</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default EditBracketModal;
