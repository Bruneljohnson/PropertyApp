import { Box } from "@mui/material";

import { type WrapperProps } from "./Wrapper.type";

export const Wrapper = ({ children }: WrapperProps): JSX.Element => (
  <Box display="flex" flexDirection="column" minHeight="100vh">
    {children}
  </Box>
);
