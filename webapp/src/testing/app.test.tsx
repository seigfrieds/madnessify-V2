import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "@/App.tsx";

test("App renders Madnessify", () => {
  render(<App />);

  expect(screen.getByText("Madnessify")).toBeDefined();
});
