/* eslint-disable @typescript-eslint/no-floating-promises */
import dotenv from "dotenv";
import { launchDatabase } from "./config/database";

dotenv.config();

import app from "./app";

//----------CONNECT TO DATABASE-------------//
launchDatabase();

//----------START SERVER-------------//
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`EXPRESS SERVER RUNNING AT ${port}`);
});
