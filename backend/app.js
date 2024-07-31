import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";

const app = express();

dotenv.config({ path: "./backend/config/config.env" });

// database connection
connectDatabase();

// all routes
import productRoutes from "./routes/products.js";

app.use("/api/v1", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running at PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
