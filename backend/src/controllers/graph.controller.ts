import {
  Request,
  Response,
  NextFunction,
} from "express";

import { getProductGraph } from "../services/graph.service";

export async function getGraph(
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

    const graph = await getProductGraph(productId);

    if (graph.nodes.length === 0) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

      return;
    }

    res.json({
      success: true,
      data: graph,
    });
  } catch (error) {
    next(error);
  }
}