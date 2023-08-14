import { CancelOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Form, Formik, type FormikProps } from "formik";
import { isEmpty } from "lodash";
import {useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { type PropertyListingType } from "../../../types";
import {
  FormImageField,
  FormInputField,
  FormResetButton,
  FormSelectField,
} from "../../atoms/FormFields";
import { ListingView } from "../../molecules";
import {
  CREATE_LISTING_FORM_INITIAL_VALUES,
  getValidationSchema,
  schemaMap,
  steps,
} from "./ListingForm.config";
import { type ListingFormProps } from "./ListingForm.types";

export const ListingForm = ({ title }: ListingFormProps): JSX.Element => {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [isErrorMessageShown, setIsErrorMessageShown] = useState<boolean | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [validatedSteps, setValidatedSteps] = useState<(boolean | null)[]>([null, null, null]);
  const [validationSchema, setValidationSchema] = useState("step1");

  const formikRef = useRef<FormikProps<PropertyListingType> | null>(null);

  const handleChangeStep = async newStep => {
    setActiveStep(newStep);
    window.scrollTo(0, 0);
  };

  const validateFormCallback = useCallback(() => {
    const { validateForm } = formikRef.current ?? {};
    if (validateForm) {
      validateForm();
    }
  }, []);

  const handleSubmit = async (values) => {
    const clearImageUrlField = { ...values, imageUrl: "" }
    const formData = new FormData();

    for (const [key, value] of Object.entries(clearImageUrlField)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fieldValue = value as any;
        formData.append(`${key}`, fieldValue);
      }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/listings`, formData, {headers: {
      "Content-Type": "multipart/form-data",},});

      const newListing: PropertyListingType = response.data.data;
      navigate(`/listings/${newListing.id}`);
    
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    setValidationSchema(schemaMap[activeStep]);

    if (validatedSteps[activeStep] === false) {
      validateFormCallback();
    }
  }, [validationSchema, validateFormCallback, activeStep, validatedSteps]);

  return (
    <>
      <Formik
        
        innerRef={formikRef}
        initialValues={CREATE_LISTING_FORM_INITIAL_VALUES}
        validationSchema={getValidationSchema(validationSchema)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={values => {
          handleSubmit(values);
        }}
      >
        {({ resetForm, values, validateForm, handleSubmit }) => {
          const changeStep = async newStep => {
            if (newStep < activeStep) {
              handleChangeStep(newStep);
              return;
            }

            const res = await validateForm();
            const didPassValidation = isEmpty(res);

            if (!didPassValidation) {
              setIsErrorMessageShown(true);
            }
            setValidatedSteps(prevState => {
              const updatedState = [...prevState];
              updatedState[activeStep] = didPassValidation;
              return updatedState;
            });
            if (didPassValidation) {
              handleChangeStep(newStep);
              setIsErrorMessageShown(false);
            }
          };

          return (
            <>
              <FormResetButton
                openDialog={openDialog}
                handleClose={() => {
                  setOpenDialog(false);
                }}
                onClick={() => {
                  resetForm();
                  changeStep(0);
                  setValidatedSteps([null, null, null])
                  setValidationSchema("step1")
                }}
              />

              <Box
                sx={{ display: "grid" , gridTemplateColumns:{xs:"1fr", md:"1fr 1fr 1fr" }, flex:1}}
                justifyContent="center"
                mb={4}
                position="relative"
                width="100%"
              >
                <Typography
                  mt={1}
                  sx={{ gridColumn: { md:2}, fontSize:{xs:"20px", md:"24px"} }}
                  justifySelf="center"
                  alignSelf="center"
                  variant="h5"
                  fontWeight="bolder"
                >
                  {title}
                </Typography>

                <IconButton
                  sx={{ justifySelf: {sx:"left",md:"right"}, gridColumn:{ md:3}, fontSize: "30px", position:{xs:"absolute",md:"relative"} }}
                  size="small"
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                >
                  <CancelOutlined fontSize="inherit" />
                </IconButton>
              </Box>

              <Stepper activeStep={activeStep} alternativeLabel sx={{ width: {xs:"75%", md:"90%"}, mx: "auto", marginBottom:"15px" }}>
                {steps.map((label, index) => {
                  const isError = validatedSteps[index] === false;
                  const labelProps: {
                    optional?: React.ReactNode;
                    error?: boolean;
                  } = {};
                  if (isError) {
                    labelProps.optional = (
                      <Typography variant="caption" color="error" fontSize={11}>
                        Failed to validate
                      </Typography>
                    );
                    labelProps.error = true;
                  }
                  return (
                    <Step
                      disabled={false}
                      key={label}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        changeStep(index);
                      }}
                    >
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              <Stack sx={{ width: {xs:"90%", md:"95%"}, mx: "auto" }} >
                <Box
                  component={Form}
                  sx={{ padding: {xs:2, md:5}, mx: "auto", borderStyle: "solid", borderWidth: 1 }}
                  bgcolor="#ffffff"
                  borderColor="grey.400"
                  borderRadius="10px"
                  maxWidth={activeStep === 2 ? "100%" : "500px"}
                  width="100%"
                  my={5}
                  mx="auto"
                >
                  <Stack spacing={3}>
                    <Typography variant="h5" fontWeight="bold">
                      {steps[activeStep]}
                    </Typography>
                    {activeStep !== 2 && <Divider />}
                    {activeStep === 0 && (
                      <>
                        <FormInputField
                          name="streetName"
                          label="Street Name"
                          placeholder="Blackburn Lane, Barking"
                          required
                        />
                        <FormInputField
                          name="city"
                          label="City"
                          placeholder="London"
                          required
                        />
                        <FormInputField
                          name="postcode"
                          label="Postcode"
                          placeholder="IG11 0TH"
                          required
                        />
                        
                        <FormSelectField
                          name="bedrooms"
                          label="No. Bedrooms"
                          required
                          items={[
                            { label: "1 Bedroom", value: "1" },
                            { label: "2 Bedroom", value: "2" },
                            { label: "3 Bedroom", value: "3" },
                            { label: "4 Bedroom", value: "4" },
                            { label: "5 Bedroom", value: "5" },
                            { label: "6 Bedroom", value: "6" },
                          ]}
                        />
                        <FormSelectField
                          name="livingrooms"
                          label="No. Living Rooms"
                          required
                          info="More Info"
                          items={[
                            { label: "1 Living Room", value: "1" },
                            { label: "2 Living Room", value: "2" },
                            { label: "3 Living Room", value: "3" },
                            { label: "4 Living Room", value: "4" },
                            { label: "5 Living Room", value: "5" },
                            { label: "6 Living Room", value: "6" },
                          ]}
                        />
                        <FormSelectField
                          name="bathrooms"
                          label="No. Bathrooms"
                          required
                          info="More Info"
                          items={[
                            { label: "1 Bathroom", value: "1" },
                            { label: "2 Bathroom", value: "2" },
                            { label: "3 Bathroom", value: "3" },
                            { label: "4 Bathroom", value: "4" },
                            { label: "5 Bathroom", value: "5" },
                            { label: "6 Bathroom", value: "6" },
                          ]}
                        />
                      </>
                    )}
                    {activeStep === 1 && (
                      <>
                        <FormImageField name="imageUrl" label="Image" required />
                        <FormInputField
                          name="summary"
                          label="Tell Us About Your Property"
                          placeholder="3 bedroom apartment that is located in West London."
                          required
                        />
                        <FormInputField
                          name="price"
                          label="Desired Selling Price - GBP"
                          placeholder="300000"
                          required
                        />
                      </>
                    )}
                    {activeStep === 2 && <ListingView {...values} />}
                  </Stack>
                  {isErrorMessageShown && (
                    <Typography
                      variant="caption"
                      color="error"
                      display="flex"
                      justifyContent="center"
                    >
                      Please complete all required fields.
                    </Typography>
                  )}
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      disabled={activeStep === 0}
                      variant="outlined"
                      onClick={() => {
                        changeStep(activeStep - 1);
                      }}
                    >
                      Back
                    </Button>

                    <Button
                      variant="contained"
                      type="button"
                      onClick={() => {
                        if (activeStep === 2) {
                          handleSubmit();
                          return;
                        }
                        changeStep(activeStep === 0 ? 1 : 2);
                      }}
                    >
                      {activeStep === 2 ? "Save and Publish" : "Next"}
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </>
          );
        }}
      </Formik>
    </>
  );
};
