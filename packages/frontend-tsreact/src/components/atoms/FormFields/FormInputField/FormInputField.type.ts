export type FormInputFieldProps = {
  placeholder?: string;
  label?: string;
  name: string;
  remove?: () => void;
  required?: boolean;
  multiline?: boolean;
  info?: string;
};
