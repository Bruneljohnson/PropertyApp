import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const fontFamily = ["Poppins", "Roboto", "-apple-system", "BlinkMacSystemFont", "sans-serif"].join(
  ",",
);

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        fontFamily,
        background: grey[100],
      },
      a: { textDecoration: "none" },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "100px",
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
        },
      },
    },
  },
};

const palette = {
  primary: {
    main: "#50086E",
  },
  secondary: {
    main: "#FF5722",
    alt: "#6A148E",
    tertiary: "#002396",
  },
  nav: {
    main: "#ffffff",
  },
};

const typography = {
  fontFamily,
};

export const theme = createTheme({
  components,
  palette,
  typography,
});
