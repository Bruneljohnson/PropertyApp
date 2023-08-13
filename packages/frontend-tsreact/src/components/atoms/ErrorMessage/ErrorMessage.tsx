import { Box, Typography } from "@mui/material";

import errorImage from "../../../assets/error.png";
import { type ErrorMessageProps } from "./ErrorMessage.type";

export const ErrorMessage = ({
  heading = "Uh oh! Something went wrong.",
  message = `We're experiencing technical issues. Please try again later.`,
}: ErrorMessageProps): JSX.Element => (
  <Box display="flex" alignItems="center" my={4}>
    <Box component="img" width={150} alt="Error message" src={errorImage} />
    <Box display="flex" flexDirection="column" ml={4}>
      <Typography variant="h5" mb={1} >
        {heading}
      </Typography>
      <Typography variant="subtitle1">{message}</Typography>
    </Box>
  </Box>
);
