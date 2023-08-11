import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../error/App-error";

export const validationErrorHandler: RequestHandler = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new AppError(error.array()[0].msg as string, 400);
  }
  next();
};
