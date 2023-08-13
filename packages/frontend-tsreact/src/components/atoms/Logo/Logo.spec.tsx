import { render, screen } from "@testing-library/react";

import { Logo } from "./Logo";

describe("AndLogo component", () => {
  it("renders successfully", () => {
    render(<Logo />);
    const logoImg = screen.getByTitle("PropertyApp logo");

    expect(logoImg).toBeInTheDocument();
  });
});
