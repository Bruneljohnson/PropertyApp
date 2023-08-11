import compression from "compression";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

//----------Security----------//
import cors from "cors";
import mongoSanitise from "express-mongo-sanitize";
import helmet from "helmet";

//----------Helpers----------//
import { globalErrorHandler } from "./error/global-error";

//---------Routers----------//
import propertyRouter from "./routes/property-router";
import healthcheckRouter from "./routes/healthcheck-router";

//----------Global Middleware----------//
import { error404 } from "./error";

//----------Create Server----------//
const app = express();

// Implement CORS and Security Headers in API Requests

const allowedlist = ["http://localhost:3000"];

const corOptions: cors.CorsOptions = {
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  origin: allowedlist,
  credentials: true,
  preflightContinue: false,
};

app.use(cors(corOptions));
app.use(helmet({ crossOriginResourcePolicy: false }));

// Log request in dev
process.env.NODE_ENV === "development" && app.use(morgan("dev"));

//Parse incoming JSON data to use in req.body
app.use(json());
app.use(urlencoded({ extended: true }));

//Sanitisation against NoSQL Injection Queries
app.use(mongoSanitise());

//Compress request/response cycle
app.use(compression());

//----------Sub-Routes----------//
app.use("/api", healthcheckRouter);
app.use("/api/listings", propertyRouter);

//----------Swagger----------//
const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "The PropertyApp Express Backend Server.",
      version: "1.0.0",
      description:
        "This Is The PropertyApp Express Backend Server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).",
    },
  },
  schemes: ["http", "https"],
  servers: [{ url: "http://localhost:8080/", description: "Development Server" }],

  apis: [
    `${__dirname}/routes/*.ts`,
    "../build/routes/*.js",
    `${__dirname}/models/model-types/*.model.ts`,
  ],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api/api-docs", serve);
app.get("/api/api-docs", setup(swaggerSpec));

//----------GLOBAL HANDLING & 404 ROUTE----------//
app.get("*", error404);
app.use(globalErrorHandler);

export default app;
