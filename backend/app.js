import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";

const app = express();

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Shutting down Server due to uncaughtException");

  process.exit(1);
});

dotenv.config({ path: "./backend/config/config.env" });

// database connection
connectDatabase();

app.use(express.json());

// all routes
import productRoutes from "./routes/products.js";

app.use("/api/v1", productRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running at PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle unhandled Promise rejections

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("Shutting down Server due to unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
