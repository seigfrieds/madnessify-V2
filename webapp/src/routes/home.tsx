import { createFileRoute } from "@tanstack/react-router";
import styles from "./home.module.scss";
import { useRef, useState } from "react";
import Button from "@/components/Button.tsx";
import type { Song } from "@/domain/Song.js";
import MainLayout from "@/layouts/main.layout.tsx";
import useDebounce from "@/hooks/use-debounce.ts";
import { useSearchSongsQuery, useTopSongsQuery } from "@/services/song-service.ts";
import useOnClickOutside from "@/hooks/use-on-click-outside.ts";
import EditBracketModal from "@/components/EditBracketModal";
import { createBracketFromSongs } from "@/domain/Bracket.js";
import Select from "@/components/Select.tsx";

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

  // #region Top songs
  const [timeFrame, setTimeFrame] = useState<"short_term" | "medium_term" | "long_term">();
  const [numberOfSongs, setNumberOfSongs] = useState<2 | 4 | 8 | 16 | 32>();

  const { data: topSongsQueryResult } = useTopSongsQuery(numberOfSongs, timeFrame);
  const topSongs = topSongsQueryResult ?? [];
  // #endregion

  const bracket =
    selectedTab === Tabs.SEARCH_SONGS
      ? createBracketFromSongs(bracketSongs)
      : createBracketFromSongs(topSongs);

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
          {selectedTab === Tabs.TOP_SONGS && (
            <div className={styles.bracketCreator}>
              <div className={styles.songCountAndEditBracket}>
                <p className={styles.songCount}>Songs ({topSongs.length})</p>
                <Button onClick={openEditBracketModal} variant="Secondary">
                  Edit Bracket
                </Button>
              </div>
              <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <Select
                    options={[
                      { label: "Top 2 songs", value: 2 },
                      { label: "Top 4 songs", value: 4 },
                      { label: "Top 8 songs", value: 8 },
                      { label: "Top 16 songs", value: 16 },
                      { label: "Top 32 songs", value: 32 },
                    ]}
                    placeholder="Select # of songs"
                    value={numberOfSongs}
                    onValueChange={(numSongs) => setNumberOfSongs(numSongs)}
                  />
                </div>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <Select
                    options={[
                      { label: "Last 4 weeks", value: "short_term" },
                      { label: "Last 6 months", value: "medium_term" },
                      { label: "Last year", value: "long_term" },
                    ]}
                    placeholder="Select time frame"
                    value={timeFrame}
                    onValueChange={(timeFrame) => setTimeFrame(timeFrame)}
                  />
                </div>
              </div>
              <ul className={styles.songsContainer}>
                {topSongs.map((song) => (
                  <li className={styles.song} key={song.id}>
                    <img className={styles.songPicture} src={song.imageUrl} />
                    <div className={styles.songTitleAndArtist}>
                      <p className={styles.songTitle}>{song.title}</p>
                      <p className={styles.songArtist}>{song.mainArtistName}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.bracketCreatorActionBar}>
                <Button variant="Primary">Play</Button>
              </div>
            </div>
          )}
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
