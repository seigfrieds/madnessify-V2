import { createFileRoute } from "@tanstack/react-router";
import styles from "./home.module.scss";
import { useRef, useState } from "react";
import Button from "@/components/Button.tsx";
import type { Song } from "@/domain/Song.js";
import MainLayout from "@/layouts/main.layout.tsx";
import useDebounce from "@/hooks/use-debounce.ts";
import { useSearchSongsQuery } from "@/services/song-service.ts";
import useOnClickOutside from "@/hooks/use-on-click-outside.ts";
import EditBracketModal from "@/components/EditBracketModal";
import { createBracketFromSongs } from "@/domain/Bracket.js";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

const Tabs = {
  SEARCH_SONGS: 1,
  TOP_SONGS: 2,
} as const;
type Tab = (typeof Tabs)[keyof typeof Tabs];

function HomePage() {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tabs.SEARCH_SONGS);

  // #region Bracket management
  const [bracketSongs, setBracketSongs] = useState<Song[]>([]);
  const bracket = createBracketFromSongs(bracketSongs);

  const addSong = (songToAdd: Song) => {
    if (bracketSongs.filter((song) => song.id === songToAdd.id).length === 0) {
      bracketSongs.push(songToAdd);
    }
  };

  const removeSong = (songToRemove: Song) => {
    setBracketSongs((prevSongs) => prevSongs.filter((song) => song !== songToRemove));
  };
  // #endregion

  // #region Searching songs
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearchSongInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const debouncedSearchQuery = useDebounce<string>(searchQuery, 300);

  const { data: searchedSongs } = useSearchSongsQuery(debouncedSearchQuery);
  const hasSearchResults = !!searchedSongs && searchedSongs.length > 0;
  // #endregion

  // #region Search results focus
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState<boolean>(false);
  const showSearchResults = () => {
    setIsSearchResultsVisible(true);
  };
  const hideSearchResults = () => {
    setIsSearchResultsVisible(false);
  };

  //put all searchbar+results in ref -> if clicked outside, close
  const searchContainerRef = useRef<HTMLDivElement>(null!);
  useOnClickOutside(searchContainerRef, hideSearchResults);
  // #endregion

  // #region Edit Bracket modal management
  const [isEditBracketModalOpen, setIsEditModalBracketModal] = useState<boolean>(false);

  const openEditBracketModal = () => {
    setIsEditModalBracketModal(true);
  };

  const closeEditBracketModal = () => {
    setIsEditModalBracketModal(false);
  };
  // #endregion

  return (
    <MainLayout>
      <MainLayout.Content>
        <div className={styles.pageContent}>
          <div className={styles.tabs}>
            <Button onClick={() => setSelectedTab(Tabs.SEARCH_SONGS)} variant="Secondary">
              Search songs
            </Button>
            <Button onClick={() => setSelectedTab(Tabs.TOP_SONGS)} variant="Secondary">
              Top songs
            </Button>
          </div>
          {selectedTab === Tabs.SEARCH_SONGS && (
            <div className={styles.bracketCreator}>
              <div className={styles.songCountAndEditBracket}>
                <p className={styles.songCount}>Songs ({bracketSongs.length})</p>
                <Button onClick={openEditBracketModal} variant="Secondary">
                  Edit Bracket
                </Button>
              </div>
              <div className={styles.songSearch}>
                <div className={styles.searchBarAndResults} ref={searchContainerRef}>
                  <input
                    className={styles.searchBar}
                    placeholder="Search songs..."
                    onChange={handleSearchSongInput}
                    onFocus={showSearchResults}
                  />
                  {hasSearchResults && isSearchResultsVisible && (
                    <ul className={styles.searchResults}>
                      {searchedSongs?.map((song) => (
                        <li
                          onClick={() => {
                            addSong(song);
                            hideSearchResults();
                          }}
                          key={song.id}
                        >
                          {song.mainArtistName + " - " + song.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <ul className={styles.songsContainer}>
                {bracketSongs.map((song) => (
                  <li className={styles.song} key={song.id}>
                    <img className={styles.songPicture} src={song.imageUrl} />
                    <div className={styles.songTitleAndArtist}>
                      <p className={styles.songTitle}>{song.title}</p>
                      <p className={styles.songArtist}>{song.mainArtistName}</p>
                    </div>
                    <Button
                      onClick={() => removeSong(song)}
                      className={styles.songXButton}
                      size="Small"
                      variant="Secondary"
                    >
                      X
                    </Button>
                  </li>
                ))}
              </ul>
              <div className={styles.bracketCreatorActionBar}>
                <Button variant="Primary">Play</Button>
              </div>
            </div>
          )}
          {selectedTab === Tabs.TOP_SONGS && <div className={styles.bracketCreator}></div>}
          <EditBracketModal
            bracket={bracket}
            isOpen={isEditBracketModalOpen}
            onClose={closeEditBracketModal}
          />
        </div>
      </MainLayout.Content>
    </MainLayout>
  );
}
