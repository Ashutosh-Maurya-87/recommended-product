import { Router } from "express";

import {
  getProductRecommendations,
  getCategoryBasedRecommendations,
} from "../controllers/recommendation.controller";

const router = Router();

router.get(
  "/products/:id/recommendations",
  getProductRecommendations
);

router.get(
  "/products/:id/category-recommendations",
  getCategoryBasedRecommendations
);

export default router;