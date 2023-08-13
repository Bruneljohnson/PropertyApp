import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { ListingFiltersProvider } from "./providers";
import { theme } from "./themes";

const root = createRoot(document.querySelector("#root") as HTMLElement);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ListingFiltersProvider>
          <App />
        </ListingFiltersProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
