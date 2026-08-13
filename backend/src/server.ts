import "dotenv/config";

import express from "express";
import cors from "cors";

import { testDatabaseConnection } from "./db/testConnection";

import productRoutes from "./routes/product.routes";
import recommendationRoutes from "./routes/recommendation.routes";
import interactionRoutes from "./routes/interaction.routes";
import { errorHandler } from "./middleware/error.middleware";
import graphRoutes from "./routes/graph.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { notFoundHandler } from "./middleware/notFound.middleware";

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
    try {
        await testDatabaseConnection();

        res.json({
            success: true,
            api: "healthy",
            database: "connected",
        });
    } catch (error) {
        console.error("Health check failed:", error);

        res.status(503).json({
            success: false,
            api: "healthy",
            database: "unavailable",
        });
    }
});

app.use("/api/products", productRoutes);

app.use("/api", interactionRoutes);
app.use("/api", recommendationRoutes);
app.use("/api", graphRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(notFoundHandler);

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