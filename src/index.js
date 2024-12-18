import { app } from "./app.js";
import logger from "./logger.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




dotenv.config({
  path: path.resolve(__dirname, '.env') 
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

