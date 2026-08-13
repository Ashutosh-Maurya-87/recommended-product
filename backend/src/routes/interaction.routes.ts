import { Router } from "express";

import {
  createUserInteraction,
} from "../controllers/interaction.controller";

const router = Router();

router.post(
  "/users/:userId/interactions",
  createUserInteraction
);

export default router;