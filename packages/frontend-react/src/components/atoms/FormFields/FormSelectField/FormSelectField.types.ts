export type FormSelectFieldProps = {
  name: string;
  placeholder?: string;
  label?: string;
  items: { label: string; value: string | number }[];
  description?: string;
  required?: boolean;
  info?: string;
};
