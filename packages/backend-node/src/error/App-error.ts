import { IError } from "./error-type.model";

//----------APP ERROR CLASS----------//
/**
 * Class that handles all errors within our express application.
 * @param {string} message - Custom message set when next(err) is called.
 * @param {number} statusCode - Relevant statuscode set when next(err) is called.
 * @return {Error} error object with status, statuscode and message properties.
 */
export class AppError extends Error implements IError {
  statusCode: number;
  status: string;
  code?: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, code?: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "Fail" : "Error";
    this.code = code;
    this.isOperational = true;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Error.captureStackTrace(this);
  }
}
