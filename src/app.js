import express from "express";
import logger from "./logger.js";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./db/index.js";

const app = express();

connectDB();

const morganFormat = ":method :url :status :response-time ms";

//cors middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

//logger middleware
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

//express middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

export {app };