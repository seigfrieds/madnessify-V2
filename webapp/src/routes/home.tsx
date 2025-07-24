import { createFileRoute } from "@tanstack/react-router";
import "./home.scss";
import { useState } from "react";
import Button from "@/components/Button.tsx";
import type { Song } from "@/domain/Song.js";
import MainLayout from "@/layouts/main.layout.tsx";

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
  const [songs, setSongs] = useState<Song[]>([
    {
      id: "1",
      title: "LIKE WEEZY",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b2736b219c8d8462bfe254a20469",
    },
    {
      id: "2",
      title: "Location",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b273e31a279d267f3b3d8912e6f1",
    },
    {
      id: "3",
      title: "R.I.P.",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b273a1e867d40e7bb29ced5c0194",
    },
    {
      id: "4",
      title: "Vamp Anthem",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b27398ea0e689c91f8fea726d9bb",
    },
    {
      id: "1",
      title: "LIKE WEEZY",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b2736b219c8d8462bfe254a20469",
    },
    {
      id: "2",
      title: "Location",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b273e31a279d267f3b3d8912e6f1",
    },
    {
      id: "3",
      title: "R.I.P.",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b273a1e867d40e7bb29ced5c0194",
    },
    {
      id: "4",
      title: "Vamp Anthem",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b27398ea0e689c91f8fea726d9bb",
    },
    {
      id: "1",
      title: "LIKE WEEZY",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b2736b219c8d8462bfe254a20469",
    },
    {
      id: "2",
      title: "Location",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b273e31a279d267f3b3d8912e6f1",
    },
    {
      id: "3",
      title: "R.I.P.",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b273a1e867d40e7bb29ced5c0194",
    },
    {
      id: "4",
      title: "Vamp Anthem",
      mainArtistName: "Playboi Carti",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b27398ea0e689c91f8fea726d9bb",
    },
  ]);

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
              <p id="song-count">Songs ({songs.length})</p>
              <div id="song-search">
                <input id="search-bar" placeholder="Search songs..." />
                <Button variant="secondary">Add Song</Button>
              </div>
              <div id="songs-container">
                {songs.map((item) => (
                  <div className="song" key={item.id}>
                    <img className="song-picture" src={item.imageUrl} />
                    <p className="song-artist-and-title">
                      {item.mainArtistName + " - " + item.title}
                    </p>
                    <Button className="song-x-button" size="small" variant="secondary">
                      X
                    </Button>
                  </div>
                ))}
              </div>
              <div id="action-bar">
                <Button variant="primary">Submit</Button>
              </div>
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
