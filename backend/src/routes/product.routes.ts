import { Router } from "express";

import {
  listProducts,
  getProduct,
  search,
  listCategories,
  listBrands,
} from "../controllers/product.controller";

const router = Router();

router.get("/", listProducts);

router.get("/search", search);

router.get("/categories", listCategories);

router.get("/brands", listBrands);

router.get("/:id", getProduct);

export default router;