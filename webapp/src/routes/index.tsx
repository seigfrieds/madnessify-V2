import { createFileRoute } from "@tanstack/react-router";
import styles from "./index.module.scss";
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
    <main className={styles.pageContent}>
      <div className={styles.logoAndTaglineContainer}>
        <img className={styles.madnessifyLogo} src={MadnessifyLogo} alt="Madnessify Logo" />
        <p className={styles.tagline}>Create and play tournaments with your favorite songs</p>
      </div>
      <button className={styles.loginButton} onClick={navigateToSpotifyLoginAsync} type="button">
        Login
      </button>
    </main>
  );
}
