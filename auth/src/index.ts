import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined in environment variables");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("Connected to MongoDB");
  } catch (err) {
    console.error("Error on DB connection: ", err);
  }

  app.listen(3000, () => {
    console.log("Auth service listening on port 3000!!!!!!");
  });
};

start();
