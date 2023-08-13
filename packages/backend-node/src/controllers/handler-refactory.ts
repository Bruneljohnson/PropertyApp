/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NextFunction, Request, Response } from "express";
import {
  ServiceCreateOneDoc,
  ServiceGetAllDocs,
  ServiceGetOneDoc,
} from "./handler-refactory-types.model";
import { ISQL3PropertySchema } from "../models/model-types/property.model";
import { PropertyListing } from "../models/SquelizePropertyModel";

//----------Create One Handler----------//
/**
 * Function that sends a created Document as JSON object.
 * @param {ServiceCreateOneDoc} Service - From either user or bio service.
 * @return {Promise<void>}
 */
export const createOne = (Service: ServiceCreateOneDoc) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let document;
      if (!req.photo) {
        document = await Service(req.body);
      } else {
        const body = Object.assign({}, req.body) as ISQL3PropertySchema;
        const { id, address, price, imageUrl, summary, bathrooms, bedrooms, livingrooms } = body;
        document = await Service({
          id,
          address,
          price,
          summary,
          bathrooms,
          bedrooms,
          livingrooms,
          imageName: req.photo,
          imageUrl,
        });
      }
      res.status(201).json({ status: "success", data: document as PropertyListing });
    } catch (err) {
      next(err);
    }
  };
};

//----------Get All Handler----------//
/**
 * Function that sends all doucments as a JSON object.
 * @param {ServiceGetAllDocs} Service - From either user or bio service.
 * @return {Promise<void>}
 */
export const getAll =
  (Service: ServiceGetAllDocs) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const documents = await Service(req, req.query);

      res.status(200).json({
        status: "success",
        length: documents.length,
        data: documents,
      });
    } catch (err) {
      next(err);
    }
  };

//----------Get One Handler----------//
/**
 * Function that sends a doucment as a JSON object.
 * @param {ServiceGetOneDoc} Service - From either user or bio service.
 * @return {Promise<void>}
 */
export const getOne = (Service: ServiceGetOneDoc) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const document = await Service(req.params.id);

      res.status(200).json({
        status: "success",
        data: document,
      });
    } catch (err) {
      next(err);
    }
  };
};
