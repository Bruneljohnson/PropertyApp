import { RemoveCircle } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Field, getIn } from "formik";
import { memo } from "react";

import { FormErrorMessage } from "../FormErrorMessage";
import { FormLabel } from "../FormLabel";
import { type FormInputFieldProps } from "./FormInputField.type";

export const FormInputField = memo(
  ({
    label,
    name,
    placeholder,
    remove,
    required,
    multiline,
    info,
  }: FormInputFieldProps): JSX.Element => (
    <Field name={name}>
      {({ field, form })=> {
        const fieldError = getIn(form.errors, name);

        return (
          <Box width="100%">
            {label && <FormLabel label={label} required={required} info={info} />}

            <OutlinedInput
              fullWidth
              multiline={multiline}
              placeholder={placeholder}
              rows={multiline ? 4 : undefined}
              variant="standard"
              {...field}
              {...(remove && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        remove();
                      }}
                      edge="end"
                    >
                      <RemoveCircle />
                    </IconButton>
                  </InputAdornment>
                ),
              })}
            />

            {Boolean(fieldError) && <FormErrorMessage message={fieldError as string} />}
          </Box>
        );
      }}
    </Field>
  ),
);
