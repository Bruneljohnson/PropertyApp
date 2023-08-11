import { RequestHandler } from "express";
import { AppError } from "./App-error";

//----------404 Error Handler----------//
/**
 * Function that handles an error caused by requesting a URL path that doesn't exist in our application.
 * @param {Request} req - express request object.
 * @param {Response} res - express response object.
 * @param {NextFunction} req - express next function.
 * @return {void}
 */
export const error404: RequestHandler = (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this Server`, 404));
};
