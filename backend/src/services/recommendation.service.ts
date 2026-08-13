import { driver } from "../db/driver";

import {
  GET_RECOMMENDATIONS_QUERY,
  GET_CATEGORY_RECOMMENDATIONS_QUERY,
} from "../queries/recommendation.queries";

import { Recommendation } from "../types/product";

export async function getRecommendations(
  productId: string,
  limit = 6
): Promise<Recommendation[]> {
  const session = driver.session();

  try {
    const result = await session.run(
      GET_RECOMMENDATIONS_QUERY,
      {
        productId,
        limit,
      }
    );

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      price: record.get("price"),
      rating: record.get("rating"),
      image: record.get("image"),
      sharedBuyers: record
        .get("sharedBuyers")
        .toNumber(),
    }));
  } finally {
    await session.close();
  }
}

export async function getCategoryRecommendations(
  productId: string,
  limit = 6
) {
  const session = driver.session();

  try {
    const result = await session.run(
      GET_CATEGORY_RECOMMENDATIONS_QUERY,
      {
        productId,
        limit,
      }
    );

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      price: record.get("price"),
      rating: record.get("rating"),
      image: record.get("image"),
      category: record.get("category"),
    }));
  } finally {
    await session.close();
  }
}