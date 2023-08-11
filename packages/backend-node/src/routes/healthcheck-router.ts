/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /api/healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

router.get("/healthcheck", function (req, res) {
  res.sendStatus(200);
});

export default router;
