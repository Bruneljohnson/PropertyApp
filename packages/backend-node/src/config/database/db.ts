import { Sequelize } from "sequelize";
import { ILaunchError } from "../../error/error-type.model";

export const db = new Sequelize("ThePropertyApp", "", "", {
  storage: "./database.sqlite",
  dialect: "sqlite",
  logging: false,
});
//----------Create Test DB Setup----------//
export const testDB = new Sequelize("Test-ThePropertyApp", "", "", {
  storage: "./test-database.sqlite",
  dialect: "sqlite",
  logging: false,
});

export const launchDatabase = async () => {
  try {
    const DB = process.env.NODE_ENV === "test" ? testDB : db;
    await DB.sync();
    console.log(`DB Connection Successful.`);
  } catch (err) {
    const error = err as ILaunchError;
    console.log(`DB Connection Was Unsuccessful. ${error.message} `);
  }
};
export const closeDatabase = async () => {
  try {
    await testDB.close();
    console.log(`DB Connection Successfully closed.`);
  } catch (err) {
    const error = err as ILaunchError;
    console.log(`Closing DB Connection Was Unsuccessful. ${error.message} `);
  }
};
