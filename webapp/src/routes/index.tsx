import { createFileRoute } from "@tanstack/react-router";
import "./index.scss";
import { createSpotifyLoginUrlAsync } from "@/modules/auth/login-to-spotify.ts";
import MadnessifyLogo from "@/assets/MadnessifyLogo.png";

export const Route = createFileRoute("/")({
  component: SplashPage,
});

function SplashPage() {
  const navigateToSpotifyLoginAsync = async () => {
    window.location.href = await createSpotifyLoginUrlAsync();
  };

  return (
    <main id="splash-page-content">
      <div id="logo-and-tagline-container">
        <img id="madnessify-logo" src={MadnessifyLogo} alt="Madnessify Logo" />
        <p id="tagline">Create and play tournaments with your favorite songs</p>
      </div>
      <button id="login-button" onClick={navigateToSpotifyLoginAsync} type="button">
        Login
      </button>
    </main>
  );
}
