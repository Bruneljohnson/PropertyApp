import { FormHelperText } from "@mui/material";

import { type FormErrorMessageProps } from "./FormErrorMessage.types";

export const FormErrorMessage = ({ message }: FormErrorMessageProps): JSX.Element => (
  <FormHelperText sx={{ color: "error.main", mt: 0.5, mx: 0 }}>{message}</FormHelperText>
);
