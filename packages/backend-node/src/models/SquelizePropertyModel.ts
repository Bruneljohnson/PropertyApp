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
      streetName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 80],
            msg: "Street name must be longer than 2 and less than 80 characters.",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 80],
            msg: "City name must be longer than 2 and less than 80 characters.",
          },
        },
      },
      postcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 10],
            msg: "Postcode must be longer than 2 and less than 10 characters.",
          },
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 300],
            msg: "Description must be longer than 2 and less than 300 characters.",
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
      streetName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 80],
            msg: "Street name must be longer than 2 and less than 80 characters.",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 80],
            msg: "City name must be longer than 2 and less than 80 characters.",
          },
        },
      },
      postcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 10],
            msg: "Postcode must be longer than 2 and less than 10 characters.",
          },
        },
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 300],
            msg: "Description must be longer than 2 and less than 300 characters.",
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
