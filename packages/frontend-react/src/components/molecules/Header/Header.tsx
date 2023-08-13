import { Box, Container, Grid } from "@mui/material";
import logoImage from "assets/PropertyApp.png";
import { ListingSearch } from "components/molecules";
import { PAGE_URLS } from "config";
import { Link } from "react-router-dom";

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
        <Grid item xs={3} display="flex">
          <Box component={Link} to={PAGE_URLS.listings} sx={{ display: "flex" }}>
            <Box component="img" width={200} alt="company logo" src={logoImage} />
          </Box>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="center">
          <ListingSearch loading={false} />
        </Grid>
      </Grid>
    </Container>
  </Box>
);
