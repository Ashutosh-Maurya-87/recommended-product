import { Router } from "express";

import { getGraph } from "../controllers/graph.controller";

const router = Router();

router.get("/products/:id/graph", getGraph);

export default router;