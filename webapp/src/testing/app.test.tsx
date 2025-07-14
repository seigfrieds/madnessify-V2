import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "@/app/App.tsx";

test("App renders Madnessify", () => {
  render(<App />);

  expect(screen.getByText("Madnessify")).toBeDefined();
});
