import { Request } from "express";
import { ISQL3PropertySchema } from "../models/model-types/property.model";
import { PropertyListing } from "../models/SquelizePropertyModel";

export type ServiceCreateOneDoc = (payload: ISQL3PropertySchema) => Promise<PropertyListing>;

export type ServiceGetAllDocs = (
  req: Request,
  query:
    | Record<string, never>
    | {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        [prop: string]: any;
      },
) => Promise<ISQL3PropertySchema[]>;

export type ServiceGetOneDoc = (id: string) => Promise<ISQL3PropertySchema>;
