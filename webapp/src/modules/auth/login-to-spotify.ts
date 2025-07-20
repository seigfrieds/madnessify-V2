import axios from "axios";
import config from "@/config.ts";
import { generateRandomString, sha256Async, base64encode } from "./pkce-auth.ts";

export const loginToSpotifyAsync = async () => {
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const csrfToken = generateRandomString(16);
  window.localStorage.setItem("spotify-auth-csrf-token", csrfToken);

  const codeVerifier = generateRandomString(64);
  window.localStorage.setItem("code_verifier", codeVerifier);

  const hashed = await sha256Async(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const params = {
    response_type: "code",
    client_id: config.SPOTIFY_CLIENT_ID,
    scope: config.SPOTIFY_AUTH_SCOPE,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    state: csrfToken,
    redirect_uri: config.SPOTIFY_REDIRECT_URI,
  };

  authUrl.search = new URLSearchParams(params).toString();

  window.location.href = authUrl.toString();
};

export const handleSpotifyCallbackAsync = async (state: string, code?: string, error?: string) => {
  if (state !== localStorage.getItem("spotify-auth-csrf-token")) {
    throw Error();
  }

  if (!code || error) {
    throw Error();
  }

  await getSpotifyAccessTokenAsync(code);
};

const getSpotifyAccessTokenAsync = async (code: string) => {
  const codeVerifier = localStorage.getItem("code_verifier");

  const spotifyGetTokenUrl = "https://accounts.spotify.com/api/token";

  const res = await axios.post(
    spotifyGetTokenUrl,
    {
      grant_type: "authorization_code",
      code,
      redirect_uri: config.SPOTIFY_REDIRECT_URI,
      client_id: config.SPOTIFY_CLIENT_ID,
      code_verifier: codeVerifier,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  const body = res.data;

  localStorage.setItem("access_token", body.access_token);
};
