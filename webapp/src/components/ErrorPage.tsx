import Button from "./Button.tsx";
import styles from "./ErrorPage.module.scss";
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
    <main className={styles.pageContent}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.header}>Something went wrong!</h1>
          <p className={styles.subtitle}>
            There was a problem processing your request. Please try again.
          </p>
        </div>
        <Button onClick={redirectUser}>{redirectText}</Button>
      </div>
    </main>
  );
}

export default ErrorPage;
