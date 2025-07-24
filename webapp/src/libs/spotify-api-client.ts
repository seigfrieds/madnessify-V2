import axios from "axios";
import { authStore } from "@/modules/auth/auth-store.ts";
import { router } from "@/Main.tsx";

const spotifyApiClient = axios.create({
  baseURL: "https://api.spotify.com",
});

spotifyApiClient.interceptors.request.use(
  (config) => {
    const token = authStore.getSpotifyAccessToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

spotifyApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    //unauthorized -> go back to login
    if (error.response.status === 401) {
      router.navigate({ to: "/" });
    }

    return Promise.reject(error);
  },
);

export default spotifyApiClient;
