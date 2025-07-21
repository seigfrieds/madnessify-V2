import { createFileRoute } from "@tanstack/react-router";
import "./home.scss";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

function HomePage() {
  return (
    <main id="home-page-content">
      <p>HomePage</p>
    </main>
  );
}
