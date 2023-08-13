import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Footer } from "./Footer";

it("renders successfully", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
  const footer = screen.getByRole("contentinfo");

  expect(footer).toBeInTheDocument();
});
