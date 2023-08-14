import { Box, Container, Grid, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import logoImage from "../../../assets/PropertyApp.png";
import { NAVIGATION_ITEMS } from "../../../config";
import { Image } from "../../atoms/Image";
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
        <Grid item xs={3} display="flex" justifyContent="center" ml={0} gap={2}>
          <Image image={logoImage} imageSizeNo={50} alt="PropertyApp logo"/>
          <Stack direction="row" alignItems="center" spacing={2} display="flex">
        {NAVIGATION_ITEMS.map(({ label, url }, i) => (
          <Link
            underline="hover"
            variant="body2"
            key={i}
            color="#ffffff"
            component={RouterLink}
            to={url}
          >
            {label}
          </Link>
        ))}
      </Stack>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="center">
          <ListingSearch loading={false} />
        </Grid>
      </Grid>
    </Container>
  </Box>
);
