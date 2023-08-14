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
      sx={{ justifyContent: "space-between", alignItems: "center", display:"flex"  }}
    >
      <Grid container sx={{display: "grid", gridTemplateColumns:{xs:"1fr", md:"1fr 1fr"}, gap:1}}>
        <Grid item display="flex" ml={0} gap={2} sx={{ gridColumn: { xs: 1 }, justifyContent: { xs: "space-between", md:"flex-start" }, width: "100%" }}>
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
        <Grid item display="flex" justifyContent="center" mr={0} sx={{ gridColumn: { xs: 1, md: 2 } }}>
          <ListingSearch loading={false} />
        </Grid>
      </Grid>
    </Container>
  </Box>
);
