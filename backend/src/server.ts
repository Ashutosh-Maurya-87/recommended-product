import "dotenv/config";

import express from "express";
import cors from "cors";

import { testDatabaseConnection } from "./db/testConnection";

import productRoutes from "./routes/product.routes";
import recommendationRoutes from "./routes/recommendation.routes";

import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/api/health", async (_req, res) => {
  res.json({
    success: true,
    message: "RecomGraph API is running",
  });
});

app.use("/api/products", productRoutes);

app.use("/api", recommendationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(
    `RecomGraph API running on http://localhost:${PORT}`
  );

  try {
    await testDatabaseConnection();
  } catch (error) {
    console.error(
      "CognoDB connection failed:",
      error
    );
  }
});