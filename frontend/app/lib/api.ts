import {
    Product,
    Recommendation,
    Category,
    Brand,
    Stats,
    GraphData,
} from "../types/product";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

async function request<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(
            result.message ||
            "Something went wrong"
        );
    }

    return result.data;
}

// for all data
export async function getProducts(
    category?: string
): Promise<Product[]> {
    const query = category
        ? `?limit=50&category=${encodeURIComponent(category)}`
        : "?limit=50";

    return request<Product[]>(
        `/products${query}`
    );
}
export async function getProduct(
    id: string
): Promise<Product> {
    return request<Product>(
        `/products/${id}`
    );
}

export async function searchProducts(
    query: string
): Promise<Product[]> {
    return request<Product[]>(
        `/products/search?q=${encodeURIComponent(query)}`
    );
}

export async function getCategories(): Promise<Category[]> {
    return request<Category[]>(
        "/products/categories"
    );
}

export async function getBrands(): Promise<Brand[]> {
    return request<Brand[]>(
        "/products/brands"
    );
}

export async function getRecommendations(
    productId: string
): Promise<Recommendation[]> {
    return request<Recommendation[]>(
        `/products/${productId}/recommendations`
    );
}

export async function getCategoryRecommendations(
    productId: string
): Promise<Product[]> {
    return request<Product[]>(
        `/products/${productId}/category-recommendations`
    );
}

export async function getGraph(
    productId: string
): Promise<GraphData> {
    return request<GraphData>(
        `/products/${productId}/graph`
    );
}

export async function getStats(): Promise<Stats> {
    return request<Stats>(
        "/dashboard/stats"
    );
}

export type InteractionType =
    | "VIEWED"
    | "LIKED"
    | "PURCHASED";

export async function createInteraction(
    userId: string,
    productId: string,
    type: InteractionType
) {
    return request<{
        userId: string;
        productId: string;
        type: InteractionType;
    }>(`/users/${userId}/interactions`, {
        method: "POST",
        body: JSON.stringify({
            productId,
            type,
        }),
    });
}