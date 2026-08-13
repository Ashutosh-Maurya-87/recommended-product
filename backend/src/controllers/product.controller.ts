import { Request, Response, NextFunction } from "express";

import {
    getProducts,
    getProductById,
    searchProducts,
    getCategories,
    getBrands,
} from "../services/product.service";

export async function listProducts(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const limit = Math.min(
            Number(req.query.limit) || 20,
            50
        );

        const category =
            typeof req.query.category === "string"
                ? req.query.category
                : undefined;

        const products = await getProducts(
            limit,
            category
        );

        res.json({
            success: true,
            data: products,
        });
    } catch (error) {
        next(error);
    }
}

export async function getProduct(
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

        const product = await getProductById(productId);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found",
            });

            return;
        }

        res.json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
}

export async function search(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const searchValue =
            typeof req.query.q === "string"
                ? req.query.q.trim()
                : "";

        if (!searchValue) {
            res.json({
                success: true,
                data: [],
            });

            return;
        }

        const products = await searchProducts(searchValue);

        res.json({
            success: true,
            data: products,
        });
    } catch (error) {
        next(error);
    }
}

export async function listCategories(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const categories = await getCategories();

        res.json({
            success: true,
            data: categories,
        });
    } catch (error) {
        next(error);
    }
}

export async function listBrands(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const brands = await getBrands();

        res.json({
            success: true,
            data: brands,
        });
    } catch (error) {
        next(error);
    }
}