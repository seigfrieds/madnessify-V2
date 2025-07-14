import "./LoginPage.scss";
import MadnessifyLogo from "@/assets/MadnessifyLogo.png";

function LoginPage() {
  const clickLoginButton = () => {
    console.log("Logging in...");
  };

  return (
    <main id="login-page-content">
      <div id="logo-and-tagline-container">
        <img id="madnessify-logo" src={MadnessifyLogo} alt="Madnessify Logo" />
        <p id="tagline">Create and play tournaments with your favorite songs</p>
      </div>
      <button id="login-button" onClick={clickLoginButton}>
        Login
      </button>
    </main>
  );
}

export default LoginPage;
