import { describe, expect, test, vi } from "vitest";
import { _createSpotifyLoginUrlAsync, validateSpotifyRedirect } from "./login-to-spotify.ts";

const mockedConfig = vi.hoisted(() => ({
  SPOTIFY_CLIENT_ID: "Test Client ID",
  SPOTIFY_REDIRECT_URI: "http://testurl.ca",
  SPOTIFY_AUTH_SCOPE: "test scope",
}));
vi.mock("@/config.ts", () => ({ default: mockedConfig }));

describe("login-to-spotify.ts tests", () => {
  describe("_createSpotifyLoginUrlAsync", () => {
    test("URL formed properly", async () => {
      const { spotifyLoginUrl } = await _createSpotifyLoginUrlAsync();

      const url = new URL(spotifyLoginUrl);
      const urlPath = url.origin + url.pathname;
      const urlParams = url.searchParams;

      //see https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
      expect(urlPath).toBe("https://accounts.spotify.com/authorize");
      expect(urlParams.get("client_id")).toBe(mockedConfig.SPOTIFY_CLIENT_ID);
      expect(urlParams.get("response_type")).toBe("code");
      expect(urlParams.get("redirect_uri")).toBe(mockedConfig.SPOTIFY_REDIRECT_URI);
      expect(urlParams.has("state")).toBe(true);
      expect(urlParams.get("scope")).toBe(mockedConfig.SPOTIFY_AUTH_SCOPE);
      expect(urlParams.get("code_challenge_method")).toBe("S256");
      expect(urlParams.has("code_challenge")).toBe(true);
    });
  });

  describe("validateSpotifyRedirect", () => {
    test("Throw if state and csrf token do not match", () => {
      expect(() => validateSpotifyRedirect("csrf", "not csrf", "code", undefined)).toThrow();
    });

    test("Throw if code and error exists", () => {
      expect(() => validateSpotifyRedirect("csrf", "csrf", "code", "error")).toThrow();
    });

    test("Throw if error exists and code does not exist", () => {
      expect(() => validateSpotifyRedirect("csrf", "csrf", undefined, "error")).toThrow();
    });

    test("OK if csrf is valid, code exists, and error does not exist", () => {
      expect(() => validateSpotifyRedirect("csrf", "csrf", "code", undefined)).not.toThrow();
    });
  });
});
