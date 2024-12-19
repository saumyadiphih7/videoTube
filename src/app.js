import express from "express";
import logger from "./logger.js";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./db/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

connectDB();

const morganFormat = ":method :url :status :response-time ms";

app.use(cookieParser())
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

// import routes
import healthCheckRoute from "./routes/healthCheck.route.js";


//routes
app.use("/api/v1/healthCheck", healthCheckRoute);



// if route is not found 
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.originalUrl} does not exist.`,
  });
});

// error response handler

app.use(errorHandler);

export {app };