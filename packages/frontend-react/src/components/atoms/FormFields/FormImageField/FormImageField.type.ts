export type FormImageFieldProps = {
  description?: string;
  label?: string;
  name: string;
  required?: boolean;
  validation?: (value: string) => string | undefined;
};
