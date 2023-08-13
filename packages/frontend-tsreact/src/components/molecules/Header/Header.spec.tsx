import { ThemeProvider } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { theme } from "../../../themes/theme";

import { Header } from "./Header";

it("renders successfully", () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </ThemeProvider>,
  );
  const header = screen.getByRole("banner");

  expect(header).toBeInTheDocument();
});
