import { Box, Container, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { NAVIGATION_ITEMS } from "../../../config";
import { Logo } from "../../atoms/Logo";

export const Footer = (): JSX.Element => (
  <Box component="footer" mt={4} display="flex" p={4} bgcolor="primary.main">
    <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between" }}>
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
      <Logo />
    </Container>
  </Box>
);
