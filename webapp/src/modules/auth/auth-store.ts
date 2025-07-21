import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  spotifyAccessToken: string;
  csrfToken: string;
  codeVerifier: string;
}

interface Actions {
  setCsrfToken: (csrfToken: string) => void;
  setCodeVerifier: (codeVerifier: string) => void;
  setSpotifyAccessToken: (spotifyAccessToken: string) => void;
}

const useAuthStoreInternal = create<State & Actions>()(
  persist(
    (set) => ({
      spotifyAccessToken: "",
      csrfToken: "",
      codeVerifier: "",
      setSpotifyAccessToken: (newToken: string) => set({ spotifyAccessToken: newToken }),
      setCsrfToken: (newCsrfToken: string) => set({ csrfToken: newCsrfToken }),
      setCodeVerifier: (newCodeVerifier: string) => set({ codeVerifier: newCodeVerifier }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

//for non-react
export const authStore = {
  getSpotifyAccessToken: () => useAuthStoreInternal.getState().spotifyAccessToken,
  getCsrfToken: () => useAuthStoreInternal.getState().csrfToken,
  getCodeVerifier: () => useAuthStoreInternal.getState().codeVerifier,
  setSpotifyAccessToken: useAuthStoreInternal.getState().setSpotifyAccessToken,
  setCsrfToken: useAuthStoreInternal.getState().setCsrfToken,
  setCodeVerifier: useAuthStoreInternal.getState().setCodeVerifier,
};

//for react
export const useAuthStore = () => {
  const spotifyAccessToken = useAuthStoreInternal((state) => state.spotifyAccessToken);
  const csrfToken = useAuthStoreInternal((state) => state.csrfToken);
  const codeVerifier = useAuthStoreInternal((state) => state.codeVerifier);
  const setSpotifyAccessToken = useAuthStoreInternal((state) => state.setSpotifyAccessToken);
  const setCsrfToken = useAuthStoreInternal((state) => state.setCsrfToken);
  const setCodeVerifier = useAuthStoreInternal((state) => state.setCodeVerifier);

  return {
    spotifyAccessToken,
    csrfToken,
    codeVerifier,
    setSpotifyAccessToken,
    setCsrfToken,
    setCodeVerifier,
  };
};
