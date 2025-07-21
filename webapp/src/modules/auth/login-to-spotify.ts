import axios from "axios";
import config from "@/config.ts";
import { generateRandomString, sha256Async, base64encode } from "./pkce-auth-utils.ts";
import { authStore } from "@/modules/auth/auth-store.ts";

/**
 * createSpotifyLoginUrlAsync
 */
export const _createSpotifyLoginUrlAsync = async () => {
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const csrfToken = generateRandomString(16);
  const codeVerifier = generateRandomString(64);

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

  return { spotifyLoginUrl: authUrl.toString(), csrfToken, codeVerifier };
};

export const createSpotifyLoginUrlAsync = async () => {
  const { spotifyLoginUrl, csrfToken, codeVerifier } = await _createSpotifyLoginUrlAsync();

  authStore.setCsrfToken(csrfToken);
  authStore.setCodeVerifier(codeVerifier);

  return spotifyLoginUrl;
};

/**
 * handleSpotifyCallbackAsync
 */
export const validateSpotifyRedirect = (
  csrfToken: string,
  state: string,
  code?: string,
  error?: string,
) => {
  if (state !== csrfToken) {
    throw Error();
  }

  if (!code || error) {
    throw Error();
  }
};

export const handleSpotifyCallbackAsync = async (state: string, code?: string, error?: string) => {
  validateSpotifyRedirect(authStore.getCsrfToken(), state, code, error);

  const accessToken = await getSpotifyAccessTokenAsync(code as string);
  authStore.setSpotifyAccessToken(accessToken);
};

/**
 * getSpotifyAccessTokenAsync
 */
const getSpotifyAccessTokenAsync = async (code: string) => {
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "authorization_code",
      code,
      redirect_uri: config.SPOTIFY_REDIRECT_URI,
      client_id: config.SPOTIFY_CLIENT_ID,
      code_verifier: authStore.getCodeVerifier(),
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return res.data.access_token;
};
