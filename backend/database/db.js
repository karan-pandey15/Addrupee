import mongoose from "mongoose";
import { config } from "dotenv";

config();

const mongo_uri = process.env.MONGO_URI;

const db = () => {
  mongoose
    .connect(mongo_uri, {})
    .then(() => {
      console.log("connection successFull....");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default db;
