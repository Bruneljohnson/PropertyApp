import { ErrorRequestHandler, Response } from "express";
import { AppError } from "./App-error";

//----------Send Error As Response----------//
/**
 * Function that sends the custom error message and statuscode back as a JSON object.
 * @param {AppError} error - error coming from MongoDB.
 * @param {Response} res - express response object.
 * @return {void}
 */
const sendError = (error: AppError, res: Response) => {
  res.header("Content-Type", "application/json");
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong.",
    });
  }
};

//----------Global Error Handler----------//
/**
 * Function that sets the type of errors and globally manages the errors that occur in our application.
 * @param {Error} err - error coming from app.
 * @param {Request} req - express request object.
 * @param {Response} res - express response object.
 * @param {NextFunction} req - express next function.
 * @return {void}
 */
/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const error = err as AppError;
  error.statusCode = error.statusCode ?? 500;
  error.status = error.status ?? "error";

  sendError(error, res);
};
