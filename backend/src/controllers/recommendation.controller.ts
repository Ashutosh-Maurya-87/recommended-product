import { Request, Response, NextFunction } from "express";

import {
  getRecommendations,
  getCategoryRecommendations,
} from "../services/recommendation.service";

export async function getProductRecommendations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.id;

    if (typeof productId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });

      return;
    }

    const limit = Math.min(
      Number(req.query.limit) || 6,
      20
    );

    const recommendations =
      await getRecommendations(productId, limit);

    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCategoryBasedRecommendations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.id;

    if (typeof productId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });

      return;
    }

    const limit = Math.min(
      Number(req.query.limit) || 6,
      20
    );

    const recommendations =
      await getCategoryRecommendations(
        productId,
        limit
      );

    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
}