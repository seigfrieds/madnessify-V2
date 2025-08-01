import Button from "./Button.tsx";
import "./ErrorPage.scss";
import { useRouter } from "@tanstack/react-router";

interface Props {
  readonly redirectRoute?: string;
  readonly redirectText?: string;
}

function ErrorPage({ redirectRoute = "/home", redirectText = "Go to Homepage" }: Props) {
  const router = useRouter();

  const redirectUser = () => {
    router.navigate({ to: redirectRoute });
  };

  return (
    <main id="error-page-content">
      <div id="container">
        <div>
          <h1 id="header">Something went wrong!</h1>
          <p id="subtitle">There was a problem processing your request. Please try again.</p>
        </div>
        <Button onClick={redirectUser}>{redirectText}</Button>
      </div>
    </main>
  );
}

export default ErrorPage;
