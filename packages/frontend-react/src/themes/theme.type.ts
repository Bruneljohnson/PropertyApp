import "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    nav: {
      main: string;
    };
  }
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    nav: PaletteColor;
  }
}

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    nav;
  }
  interface IconButtonPropsColorOverrides {
    nav;
  }
}
