import { Box, Typography } from "@mui/material";

import errorImage from "../../../assets/error.png";
import { type ErrorMessageProps } from "./ErrorMessage.type";

export const ErrorMessage = ({
  heading = "Uh oh! Something went wrong.",
  message = `We're experiencing technical issues. Please try again later.`,
}: ErrorMessageProps): JSX.Element => (
  <Box display="flex" alignItems="center" my={4} sx={{flexDirection:{xs: 'column', md: 'row'}, justifyContent: {xs:"center", md:"flex-start"}}}>
    <Box component="img" sx={{width:{xs: 75, md: 150}, marginBottom:{xs:2, md:0}}} alt="Error message" src={errorImage} />
    <Box display="flex" flexDirection="column" sx={{marginLeft:{xs:0, md:4}}} justifyContent="center">
      <Typography variant="h5" mb={1} sx={{fontSize:{xs:"18px", md: "24px"}, textAlign:{xs:"center", md:"left"}}}>
        {heading}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontSize: { xs: "14px", md: "18px" }, textAlign: { xs: "center", md: "left" } }}>{message}</Typography>
    </Box>
  </Box>
);
