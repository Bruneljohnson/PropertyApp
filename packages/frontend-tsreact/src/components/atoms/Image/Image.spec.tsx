import { render, screen } from "@testing-library/react";

import { Image } from "./Image";
import logoImage from "../../../assets/PropertyApp.png";
import { MemoryRouter } from "react-router-dom";

describe("PropertyApp Logo component", () => {
  it("renders successfully", () => {
    render(<Image image={logoImage} imageSizeNo={50} alt="PropertyApp logo"/>,{
      wrapper: MemoryRouter,
    });
    const logoImg = screen.getByAltText("PropertyApp logo");

    expect(logoImg).toBeInTheDocument();
  });
});
