import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import logger from "../logger.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})
const MONGO_URL = `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${DB_NAME}`

// console.log(process.env.DB_PROTOCOL);
// console.log(MONGO_URL);


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;