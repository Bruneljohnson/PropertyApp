import { Container } from "@mui/material";

import { type MainProps } from "./Main.type";

export const Main = ({ children }: MainProps): JSX.Element => (
  <Container
    maxWidth="xl"
    component="main"
    sx={{ display: "flex", flexDirection: "column", flex: 1 }}
  >
    {children}
  </Container>
);
