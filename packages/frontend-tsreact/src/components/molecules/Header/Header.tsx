import { Box, Container, Grid } from "@mui/material";

import { Logo } from "../../atoms/Logo";
import { ListingSearch } from "../../molecules";

export const Header = (): JSX.Element => (
  <Box
    display="flex"
    component="header"
    justifyContent="center"
    alignItems="center"
    bgcolor="primary.main"
    mb={4}
    py={1.5}
  >
    <Container
      maxWidth="xl"
      sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}
    >
      <Grid container>
        <Grid item xs={3} display="flex" justifyContent="center">
          <Logo/>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="center">
          <ListingSearch loading={false} />
        </Grid>
      </Grid>
    </Container>
  </Box>
);
