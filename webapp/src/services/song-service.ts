import type { Song } from "@/domain/Song.js";
import spotifyApiClient from "@/libs/spotify-api-client.ts";
import { useQuery } from "@tanstack/react-query";

interface SearchSongGet {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: { images: Array<{ url: string }> };
}

const searchSongsAsync = async (query: string): Promise<Song[]> => {
  if (!query) {
    return [];
  }

  const res = await spotifyApiClient.get("/v1/search", {
    params: {
      query: query,
      type: "track",
      limit: 10,
    },
  });

  return res.data.tracks.items.map((song: SearchSongGet) => ({
    id: song.id,
    title: song.name,
    mainArtistName: song.artists[0].name,
    imageUrl: song.album.images[2].url,
  }));
};

export const useSearchSongsQuery = (search: string) => {
  return useQuery({
    queryKey: ["songSearch", search],
    queryFn: () => searchSongsAsync(search),
    enabled: !!search,
    refetchOnWindowFocus: false,
  });
};
