import { render, screen } from "@testing-library/react";
import { Formik } from "formik";

import { FormInputField } from "./FormInputField";
import { type FormInputFieldProps } from "./FormInputField.type";

describe("CreateListingField component", () => {
  const formikProps = {
    initialValues: { name: "" },
    onSubmit: () => {
      console.log("did submit");
    },
  };

  const fieldProps: FormInputFieldProps = {
    name: "name",
    label: "Full Name",
    placeholder: "Flash Tompson",
  };

  it("renders successfully", () => {
    render(
      <Formik {...formikProps}>
        <FormInputField {...fieldProps} />
      </Formik>,
    );
    const element = screen.getByPlaceholderText("Flash Tompson");

    expect(element).toBeInTheDocument();
  });
});
