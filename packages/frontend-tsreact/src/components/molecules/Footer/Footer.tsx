import { Box, Container, Typography} from "@mui/material";

import logoImage from "../../../assets/PropertyApp.png";
import { Image } from "../../atoms/Image";

export const Footer = (): JSX.Element => (
  <Box component="footer" mt={4} display="flex" p={4} bgcolor="primary.main">
    <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", justifyContent: "center",alignItems:"center", gap:"10px" }}>
      <Image image={logoImage} imageSizeNo={50} alt="PropertyApp logo"/>
      <Typography fontSize="small" style={{ color: "#fff" }}>&#169; Copyright of The PropertyApp 2023 </Typography>
    </Container>
  </Box>
);
