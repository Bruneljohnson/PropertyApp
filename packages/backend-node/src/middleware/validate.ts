import { param, query } from "express-validator";

//----------Validation Check Getting All Listing----------//
/**
 * Function that checks if certain fields are correctly listed in the Req.query.
 * @return {Array}
 */
export const checkGetAllListings = () => {
  return [
    query("limit")
      .optional()
      .isInt({ min: 1, max: 10 })
      .withMessage("The limit value should be number and between 1-10"),
    query("offset").optional().isNumeric().withMessage("The value should be number"),
  ];
};

//----------Validation Check On Listing ID----------//
/**
 * Function that checks if the ID is correctly stated in the Req.params.
 * @return {Array}
 */
export const checkIdParam = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("The value should be not empty")
      .isUUID(4)
      .withMessage("The value should be uuid v4"),
  ];
};
