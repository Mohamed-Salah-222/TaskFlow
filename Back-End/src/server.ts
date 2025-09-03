import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import type { request, response, NextFunction } from "express";

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  console.log("DATABASE URI IS NOT DEFINED IN .env FILE");
  process.exit(1);
}

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DATABASE CONNECTION FAILED:", err);
    process.exit(1);
  });
