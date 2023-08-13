export const isValidImageFileType = (fileType: string): boolean =>
  /(\/jpg|\/jpeg|\/png|\/gif)$/iu.test(fileType);

export const isRequiredField = (value: string): string | undefined => {
  if (!value) {
    return "This field is required";
  }
};

export const isLettersAndSpaces = (value: string): string | undefined => {
  const regEx = /^[a-zA-Z\s]*$/u;
  if (!regEx.test(value)) {
    return "Letters and spaces only";
  }
};

export const checkValidation = (
  value: string,
  required?: boolean,
  validation?: (string) => string | undefined,
): string | undefined => {
  const isRequired = isRequiredField(value);

  if (required && isRequired) {
    return isRequired;
  }

  if (!validation) {
    return undefined;
  }

  const getValidation = validation(value);

  if (getValidation) {
    return getValidation;
  }
};
