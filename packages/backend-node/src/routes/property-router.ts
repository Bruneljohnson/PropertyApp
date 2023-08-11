/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { getAllListings, createListing, getListingByID } from "../controllers/property-controller";
import { checkGetAllListings, checkIdParam, resizeImg, uploadPhoto } from "../middleware";
import { validationErrorHandler } from "../middleware";

const router = express.Router();

// $ref: '#/components/schemas/PropertyListingInput'  &  $ref: '#/components/schemas/PropertyListingResponse' - can be found in swagger.schemas.ts

/**
 * @swagger
 * /api/listings:
 *      post:
 *          summary: Create a property listing.
 *          tags:
 *              - POST: /api/listings
 *          description: Create a property listing in line with current schema.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/PropertyListingInput'
 *
 *
 *          responses:
 *              201:
 *                  description: Success!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                   status:
 *                                        type: string
 *                                        example: success!
 *                                   data:
 *                                        $ref: '#/components/schemas/PropertyListingResponse'
 *              500:
 *                  description: Internal server error!
 *                  content:
 *                        application/json:
 *                            schema:
 *                                type: object
 *                                properties:
 *                                    message:
 *                                          type: string
 *                                          example: Something went wrong at the server side!
 *                                    status:
 *                                          type: string
 *                                          example: Error!
 */
router.post("/", uploadPhoto, resizeImg, createListing);

/**
 * @swagger
 * /api/listings:
 *      get:
 *          summary: Returns a list of a property listings.
 *          tags:
 *              - GET: /api/listings
 *          description: Returns a list of a property listings from database.
 *          responses:
 *              200:
 *                  description: Success!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                   status:
 *                                        type: string
 *                                        example: success!
 *                                   data:
 *                                        type: array
 *                                        items:
 *                                          $ref: '#/components/schemas/PropertyListingResponse'
 *
 *              500:
 *                  description: Internal server error!
 *                  content:
 *                        application/json:
 *                            schema:
 *                                type: object
 *                                properties:
 *                                    message:
 *                                          type: string
 *                                          example: Something went wrong at the server side!
 *                                    status:
 *                                          type: string
 *                                          example: Error!
 */

router.get("/", checkGetAllListings(), validationErrorHandler, getAllListings);

/**
 * @swagger
 * /api/listings/{id}:
 *      get:
 *          summary: Returns a single property listing.
 *          tags:
 *              - GET WITH ID: /api/listings/{id}
 *          description: Returns a single property listing from database.
 *          parameters:
 *            - name: id
 *              in: path
 *              description: The id of the property listings
 *              required: true
 *          responses:
 *              200:
 *                  description: Success!
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                   status:
 *                                        type: string
 *                                        example: success!
 *                                   data:
 *                                        $ref: '#/components/schemas/PropertyListingResponse'
 *
 *              404:
 *                  description: No property listing found with that ID!
 *                  content:
 *                        application/json:
 *                            schema:
 *                                type: object
 *                                properties:
 *                                    message:
 *                                          type: string
 *                                          example: No property listing found with that ID!
 *                                    status:
 *                                          type: string
 *                                          example: Fail!
 *
 *              500:
 *                  description: Internal server error!
 *                  content:
 *                        application/json:
 *                            schema:
 *                                type: object
 *                                properties:
 *                                    message:
 *                                          type: string
 *                                          example: Something went wrong at the server side!
 *                                    status:
 *                                          type: string
 *                                          example: Error!
 */
router.get("/:id", checkIdParam(), validationErrorHandler, getListingByID);

export default router;
