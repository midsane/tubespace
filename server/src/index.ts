import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`⚙️ server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("error establising connection with db!!! ", err);
  });
