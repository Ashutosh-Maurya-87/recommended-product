import "dotenv/config";

import express from "express";
import cors from "cors";

import { testDatabaseConnection } from "./db/testConnection";

import productRoutes from "./routes/product.routes";
import recommendationRoutes from "./routes/recommendation.routes";
import interactionRoutes from "./routes/interaction.routes";
import graphRoutes from "./routes/graph.routes";
import dashboardRoutes from "./routes/dashboard.routes";

import { errorHandler } from "./middleware/error.middleware";
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


// ----------------------------------------
// Health check
// ----------------------------------------

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


// ----------------------------------------
// Routes
// ----------------------------------------

app.use("/api/products", productRoutes);

app.use("/api", interactionRoutes);
app.use("/api", recommendationRoutes);
app.use("/api", graphRoutes);
app.use("/api/dashboard", dashboardRoutes);


// ----------------------------------------
// Error handling
// ----------------------------------------

app.use(notFoundHandler);

app.use(errorHandler);


// ----------------------------------------
// Server
// ----------------------------------------

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(
    PORT,
    "0.0.0.0",
    async () => {
        console.log(
            `RecomGraph API running on port ${PORT}`
        );

        try {
            await testDatabaseConnection();

            console.log(
                "CognoDB connection successful"
            );
        } catch (error) {
            console.error(
                "CognoDB connection failed:",
                error
            );
        }
    }
);


// ----------------------------------------
// Server error handling
// ----------------------------------------

server.on("error", (error) => {
    console.error(
        "HTTP server error:",
        error
    );
});


// ----------------------------------------
// Graceful shutdown
// ----------------------------------------

const shutdown = async () => {
    console.log("Shutting down server...");

    server.close(async () => {
        try {
            const { driver } = await import("./db/driver.js");

            await driver.close();

            console.log(
                "Server and database connection closed."
            );

            process.exit(0);
        } catch (error) {
            console.error(
                "Error during shutdown:",
                error
            );

            process.exit(1);
        }
    });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);