import { driver } from "../db/driver";

import {
    GET_PRODUCTS_QUERY,
    GET_PRODUCT_BY_ID_QUERY,
    SEARCH_PRODUCTS_QUERY,
    GET_CATEGORIES_QUERY,
    GET_BRANDS_QUERY,
} from "../queries/product.queries";

import {
    Product,
    ProductSummary,
    Category,
    Brand,
} from "../types/product";

function toNumber(value: unknown): number {
    if (
        value &&
        typeof value === "object" &&
        "toNumber" in value &&
        typeof (value as { toNumber: unknown }).toNumber ===
        "function"
    ) {
        return (
            value as { toNumber: () => number }
        ).toNumber();
    }

    return Number(value);
}

export async function getProducts(
    limit = 20,
): Promise<ProductSummary[]> {
    const session = driver.session();

    try {
        const result = await session.run(
            GET_PRODUCTS_QUERY,
            {
                limit,
            }
        );

        return result.records.map((record) => ({
            id: record.get("id"),
            name: record.get("name"),
            price: toNumber(record.get("price")),
            rating: toNumber(record.get("rating")),
            image: record.get("image"),
        }));
    } finally {
        await session.close();
    }
}

export async function getProductById(
    productId: string
): Promise<Product | null> {
    const session = driver.session();

    try {
        const result = await session.run(
            GET_PRODUCT_BY_ID_QUERY,
            {
                productId,
            }
        );

        if (result.records.length === 0) {
            return null;
        }

        const record = result.records[0];

        return {
            id: record.get("id"),
            name: record.get("name"),
            description: record.get("description"),
            price: toNumber(record.get("price")),
            rating: toNumber(record.get("rating")),
            image: record.get("image"),
        };
    } finally {
        await session.close();
    }
}

export async function searchProducts(
    search: string,
    limit = 20
): Promise<ProductSummary[]> {
    const session = driver.session();

    try {
        const result = await session.run(
            SEARCH_PRODUCTS_QUERY,
            {
                search,
                limit,
            }
        );

        return result.records.map((record) => ({
            id: record.get("id"),
            name: record.get("name"),
            price: toNumber(record.get("price")),
            rating: toNumber(record.get("rating")),
            image: record.get("image"),
        }));
    } finally {
        await session.close();
    }
}

export async function getCategories(): Promise<Category[]> {
    const session = driver.session();

    try {
        const result = await session.run(
            GET_CATEGORIES_QUERY
        );

        return result.records.map((record) => ({
            id: record.get("id"),
            name: record.get("name"),
        }));
    } finally {
        await session.close();
    }
}

export async function getBrands(): Promise<Brand[]> {
    const session = driver.session();

    try {
        const result = await session.run(
            GET_BRANDS_QUERY
        );

        return result.records.map((record) => ({
            id: record.get("id"),
            name: record.get("name"),
        }));
    } finally {
        await session.close();
    }
}