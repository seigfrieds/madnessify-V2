import { createFileRoute } from "@tanstack/react-router";
import "./home.scss";
import { useRef, useState } from "react";
import Button from "@/components/Button.tsx";
import type { Song } from "@/domain/Song.js";
import MainLayout from "@/layouts/main.layout.tsx";
import useDebounce from "@/hooks/use-debounce.ts";
import { useSearchSongsQuery } from "@/services/song-service.ts";
import useOnClickOutside from "@/hooks/use-on-click-outside.ts";
import EditBracketModal from "@/components/EditBracketModal";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

const Tabs = {
  SEARCH_SONGS: 1,
  TOP_SONGS: 2,
  PLAYLIST: 3,
} as const;
type Tab = (typeof Tabs)[keyof typeof Tabs];

function HomePage() {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tabs.SEARCH_SONGS);

  // #region Song management
  const [songs, setSongs] = useState<Song[]>([]);

  const addSong = (songToAdd: Song) => {
    if (!songs.includes(songToAdd)) {
      setSongs([...songs, songToAdd]);
    }
  };

  const removeSong = (songToRemove: Song) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song !== songToRemove));
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
        <div id="home-page-content">
          <div id="tabs">
            <Button onClick={() => setSelectedTab(Tabs.SEARCH_SONGS)} variant="secondary">
              Search songs
            </Button>
            <Button onClick={() => setSelectedTab(Tabs.TOP_SONGS)} variant="secondary">
              Top songs
            </Button>
            <Button onClick={() => setSelectedTab(Tabs.PLAYLIST)} variant="secondary">
              Playlist
            </Button>
          </div>
          {selectedTab === Tabs.SEARCH_SONGS && (
            <div className="bracket-creator">
              <div id="song-count-and-edit-bracket">
                <p id="song-count">Songs ({songs.length})</p>
                <Button onClick={openEditBracketModal} variant="secondary">
                  Edit Bracket
                </Button>
              </div>
              <div id="song-search">
                <div id="search-bar-and-results" ref={searchContainerRef}>
                  <input
                    id="search-bar"
                    placeholder="Search songs..."
                    onChange={handleSearchSongInput}
                    onFocus={showSearchResults}
                  />
                  {hasSearchResults && isSearchResultsVisible && (
                    <ul id="search-results">
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
              <ul id="songs-container">
                {songs.map((song) => (
                  <li className="song" key={song.id}>
                    <img className="song-picture" src={song.imageUrl} />
                    <div className="song-title-and-artist">
                      <p className="song-title">{song.title}</p>
                      <p className="song-artist">{song.mainArtistName}</p>
                    </div>
                    <Button
                      onClick={() => removeSong(song)}
                      className="song-x-button"
                      size="small"
                      variant="secondary"
                    >
                      X
                    </Button>
                  </li>
                ))}
              </ul>
              <div id="bracket-creator-action-bar">
                <Button variant="primary">Play</Button>
              </div>
              <EditBracketModal isOpen={isEditBracketModalOpen} onClose={closeEditBracketModal} />
            </div>
          )}
          {selectedTab === Tabs.TOP_SONGS && (
            <div className="bracket-creator">
              <select>
                <option value="">Test2</option>
                <option value="">Hello2</option>
                <option value="">Dead2</option>
                <option value="">Fart2</option>
              </select>
            </div>
          )}
          {selectedTab === Tabs.PLAYLIST && (
            <div className="bracket-creator">
              <select>
                <option value="">Test3</option>
                <option value="">Hello3</option>
                <option value="">Dead3</option>
                <option value="">Fart3</option>
              </select>
            </div>
          )}
        </div>
      </MainLayout.Content>
    </MainLayout>
  );
}
