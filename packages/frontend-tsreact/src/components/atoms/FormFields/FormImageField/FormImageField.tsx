import { BrokenImage, CheckCircle, Close, CloudUploadOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Field, getIn } from "formik";
import { type DragEvent, useEffect, useRef, useState } from "react";

import { isValidImageFileType } from "../../../../utils";
import { FormErrorMessage } from "../FormErrorMessage";
import { FormLabel } from "../FormLabel";
import { type FormImageFieldProps } from "./FormImageField.type";

export const FormImageField = ({
  name,
  required,
  label,
  description,
}: FormImageFieldProps): JSX.Element => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [didUpload, setDidUpload] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    palette: {
      error: { main: outlineColor },
    },
  } = useTheme();

  useEffect(() => {
    if (didUpload === true) {
      closeRef.current?.focus();
    }
    if (didUpload === false) {
      inputRef.current?.focus();
    }
  }, [didUpload]);

  return (
    <Field name={name}>
      {({ field, form }) => {
        const { value, onBlur } = field;
        const { setFieldValue, errors } = form;

        const fieldError = getIn(errors, name);

        const handleChange = (imgFile: File) => {
          if (isValidImageFileType(imgFile.type)) {
            setFieldValue(name, URL.createObjectURL(imgFile));
            setImageError(false);
            setDidUpload(true);
          } else {
            setFieldValue(name, "");
            setImageError(true);
            setDidUpload(false);
          }
        };

        const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
          event.preventDefault();
          handleChange(event.dataTransfer.files[0]);
        };

        const handleClearSelection = () => {
          setFieldValue(name, "");
          setImageError(false);
          setDidUpload(false);
        };

        const handleKeyDown = ({ key }) => {
          if (key === "Enter") {
            inputRef.current?.click();
          }
        };

        return (
          <div>
            {label && <FormLabel label={label} required={required} />}
            {value.length > 0 ? (
              <Box display="flex" width="100%" flexDirection="column" alignItems="center">
                <CheckCircle color="secondary" sx={{ my: 3, fontSize: "75px" }} />
                <Box
                  position="relative"
                  width="300px"
                  height="300px"
                  p={3}
                  sx={{
                    borderColor: "grey.400",
                    borderWidth: "2px",
                    borderStyle: "solid",
                  }}
                >
                  <IconButton
                    ref={closeRef}
                    onClick={() => {
                      handleClearSelection();
                    }}
                    size="small"
                    sx={{
                      bgcolor: "grey.400",
                      color: "#ffffff",
                      display: "flex",
                      position: "absolute",
                      zIndex: 1,
                      top: 0,
                      right: 0,
                      transform: "translate(50%, -50%)",
                      "&:hover": {
                        bgcolor: "grey.500",
                      },
                      "&:focus": {
                        outlineStyle: "solid",
                        outlineColor,
                        outlineWidth: "2px",
                      },
                    }}
                  >
                    <Close
                      sx={{
                        fontSize: "35px",
                      }}
                    />
                  </IconButton>
                  <Box
                    component="img"
                    width="100%"
                    height="100%"
                    sx={{ objectFit: "cover" }}
                    src={value}
                    alt="ANDi Red Chair Profile"
                  />
                </Box>
              </Box>
            ) : (
              <Box
                ref={inputRef}
                tabIndex={0}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                component="label"
                htmlFor="imgUpload"
                height="300px"
                borderRadius="5px"
                overflow="hidden"
                bgcolor="grey.100"
                onKeyDown={handleKeyDown}
                onBlur={onBlur(name)}
                onDrop={handleDrop}
                onDragOver={event => {
                  event.preventDefault();
                }}
                sx={{
                  cursor: "pointer",
                  borderColor: "grey.500",
                  borderWidth: "1px",
                  borderStyle: "dashed",

                  "&:focus": {
                    outlineColor,
                    border: 0,
                    outlineStyle: "solid",
                    outlineWidth: "2px",
                  },
                }}
              >
                <Box
                  display="none"
                  component="input"
                  id="imgUpload"
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif"
                  onChange={event => {
                    if (event.target.files) {
                      handleChange(event.target.files[0]);
                    }
                  }}
                />

                {imageError ? (
                  <BrokenImage
                    sx={{
                      fontSize: "100px",
                    }}
                  />
                ) : (
                  <CloudUploadOutlined
                    sx={{
                      fontSize: "100px",
                    }}
                  />
                )}

                <Typography variant="h5" fontWeight="500" fontSize="medium" align="center">
                  {imageError ? (
                    "Incorrect file type. Please try again"
                  ) : (
                    <>
                      Drag & Drop files or{" "}
                      <Box
                        component="span"
                        color="secondary.main"
                        sx={{
                          textDecoration: "underline",
                          "&:hover": { textDecoration: "none" },
                        }}
                      >
                        Browse
                      </Box>
                    </>
                  )}
                </Typography>

                <Typography
                  mt={1}
                  variant="h5"
                  fontWeight="lighter"
                  align="center"
                  fontSize="small"
                >
                  {description}
                </Typography>
              </Box>
            )}

            {Boolean(fieldError) && <FormErrorMessage message={fieldError as string} />}
          </div>
        );
      }}
    </Field>
  );
};
