import { FormControl, MenuItem, Select } from "@mui/material";
import { Field, getIn } from "formik";

import { FormErrorMessage, FormLabel } from "../";
import { type FormSelectFieldProps } from "./FormSelectField.types";

export const FormSelectField = ({
  name,
  label,
  items,
  placeholder = "Please select...",
  required,
  info,
}: FormSelectFieldProps): JSX.Element => (
  <Field name={name}>
    {({ field, form }) => {
      const { value } = field;
      const { setFieldValue, errors } = form;

      const fieldError = getIn(errors, name);

      return (
        <FormControl>
          {label && <FormLabel label={label} required={required} info={info} />}
          <Select
            displayEmpty
            {...field}
            name={name}
            sx={{ color: value === "" ? "grey.500" : "grey.900" }}
            value={value}
            onChange={event => setFieldValue(name, event.target.value)}
          >
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>

            {items.map(({ label, value }, i) => (
              <MenuItem key={i} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>

          {Boolean(fieldError) && <FormErrorMessage message={fieldError as string} />}
        </FormControl>
      );
    }}
  </Field>
);
