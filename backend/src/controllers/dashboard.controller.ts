import {
  Request,
  Response,
  NextFunction,
} from "express";

import { getDashboardStats } from "../services/dashboard.service";

export async function getStats(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const stats = await getDashboardStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
}