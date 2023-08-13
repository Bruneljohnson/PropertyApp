import { Model, DataTypes } from "sequelize";
import { db } from "../config/database";
import { ISQL3PropertySchema } from "./model-types/property.model";
import { testDB } from "../config/database";

export class PropertyListing extends Model<ISQL3PropertySchema> {}

if (process.env.NODE_ENV !== "test") {
  PropertyListing.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 60],
            msg: "Address must be longer than 2 and less than 60 characters.",
          },
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 200],
            msg: "Description must be longer than 2 and less than 200 characters.",
          },
        },
      },
      bedrooms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bathrooms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      livingrooms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: db,
      tableName: "property-listings",
      timestamps: true,
    },
  );
}
if (process.env.NODE_ENV === "test") {
  PropertyListing.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 60],
            msg: "Address must be longer than 2 characters and less than 60",
          },
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 400],
            msg: "Description must be longer than 2 and less than 400 characters.",
          },
        },
      },
      bedrooms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bathrooms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      livingrooms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: testDB,
      tableName: "property-listings",
      timestamps: true,
    },
  );
}
