export type ISubErrors = {
  message: string;
  [prop: string]: string | boolean | number;
}[];

export interface IError extends Error {
  path?: string;
  name: string;
  code?: number;
  statusCode?: number;
  status?: string;
  message: string;
  stack?: string;
  isOperational?: boolean;
  value?: string;
  errmsg?: string;
  errors?: ISubErrors;
}

export interface ILaunchError {
  message: string;
  [props: string]: string;
}
