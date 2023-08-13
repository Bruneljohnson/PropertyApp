/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
/* eslint-disable  @typescript-eslint/no-unsafe-call */
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-S3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import { s3Client } from "../config/s3-bucket";
import { AppError } from "../error";
import { ISQL3PropertySchema } from "../models/model-types/property.model";

//----------Generate File Name----------//
/**
 * Function that generates a 32byte string which will be used as the image file name.
 * @param {ServiceCreateOneDoc} Service - From either user or bio service.
 * @return {string}
 */
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const bucketName = process.env.AWS_BUCKET_NAME;

//----------Image Upload Set Up - Multer----------//
const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file?.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload an image, (jpeg,png)", 400), false);
  }
};
const upload = multer({ storage: storage, fileFilter: multerFilter });

// "imageName" needs to match the field given in formdata on the frontend.
export const uploadPhoto = upload.single("imageName");

//----------Resize Image Middleware----------//
/**
 * Middleware Function that resizes images uploaded by user before saving to S3.
 * @param {Request} req - express request object.
 * @param {Response} res - express response object.
 * @param {NextFunction} req - express next function.
 * @return {Promis<void>}
 */
export const resizeImg = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();

  const file = req.file;

  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 500, width: 500, fit: "contain" })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer();

  // Configure the upload details to send to S3
  const fileName = `${generateFileName()}.jpeg`;
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: file.mimetype,
  };

  // Send the upload to S3
  await s3Client.send(new PutObjectCommand(uploadParams));

  req.photo = fileName;

  next();
};

//----------Get Property Images From Private S3----------//
/**
 * Function that sets the imageURl field to have a signedUrl to get objects from Private S3 Bucket.
 * @param {ISQL3PropertySchema[]} documents - express next function.
 * @return {ISQL3PropertySchema[]}
 */
export const getSignedUrlsForS3 = async (documents: ISQL3PropertySchema[]) => {
  for (const doc of documents) {
    // For each post, generate a signed URL and save it to the listings object
    doc.imageUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: doc.imageName,
      }),
      { expiresIn: 300 }, // 300 seconds
    );
  }

  return documents;
};
