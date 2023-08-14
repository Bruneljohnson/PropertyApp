import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { MemoryRouter } from "react-router-dom";

test("renders learn react link", () => {
  render(<App />, {
      wrapper: MemoryRouter,
    });
  const linkElement = screen.getByText(/Copyright of The PropertyApp 2023/i);

  expect(linkElement).toBeInTheDocument();
});
