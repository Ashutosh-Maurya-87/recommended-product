import "dotenv/config";

import neo4j from "neo4j-driver";

const uri = process.env.COGNODB_URI;
const username = process.env.COGNODB_USERNAME;
const password = process.env.COGNODB_PASSWORD;

if (!uri || !username || !password) {
    throw new Error("Missing CognoDB environment variables");
}

const driver = neo4j.driver(
    uri,
    neo4j.auth.basic(username, password)
);

async function testQueries() {
    const session = driver.session();

    try {
        console.log("\n=== PRODUCT LIST ===");

        const productsResult = await session.run(
            `
  MATCH (p:Product)
  RETURN
    p.id AS id,
    p.name AS name,
    p.price AS price,
    p.rating AS rating,
    p.image AS image
  ORDER BY p.name
  LIMIT $limit
  `,
            {
                limit: 50,
            }
        );

        productsResult.records.forEach((record) => {
            console.log({
                id: record.get("id"),
                name: record.get("name"),
                price: record.get("price"),
                rating: record.get("rating"),
                image: record.get("image"),
            });
        });
        console.log("\n=== PRODUCT LOOKUP ===");

        const productResult = await session.run(
            `
      MATCH (p:Product {id: $productId})
      RETURN p
      `,
            {
                productId: "P001",
            }
        );

        productResult.records.forEach((record) => {
            const product = record.get("p").properties;

            console.log(product);
        });

        console.log("\n=== MULTI-HOP RECOMMENDATIONS ===");

        const recommendationResult = await session.run(
            `
      MATCH (p:Product {id: $productId})
            <-[:PURCHASED]-(user:User)
            -[:PURCHASED]->(recommended:Product)

      WHERE recommended.id <> $productId

      RETURN
        recommended.id AS productId,
        recommended.name AS productName,
        count(DISTINCT user) AS sharedBuyers

      ORDER BY sharedBuyers DESC
      LIMIT $limit
      `,
            {
                productId: "P001",
                limit: 5,
            }
        );

        recommendationResult.records.forEach((record) => {
            console.log({
                productId: record.get("productId"),
                productName: record.get("productName"),
                sharedBuyers: record.get("sharedBuyers").toNumber(),
            });
        });

        console.log("\n=== CATEGORY TRAVERSAL ===");

        const categoryResult = await session.run(
            `
      MATCH (p:Product {id: $productId})
            -[:BELONGS_TO]->(category:Category)
            <-[:BELONGS_TO]-(related:Product)

      WHERE related.id <> $productId

      RETURN
        category.name AS category,
        related.name AS relatedProduct

      LIMIT $limit
      `,
            {
                productId: "P001",
                limit: 10,
            }
        );

        categoryResult.records.forEach((record) => {
            console.log({
                category: record.get("category"),
                relatedProduct: record.get("relatedProduct"),
            });
        });
    } catch (error) {
        console.error("Query test failed:", error);
    } finally {
        await session.close();
        await driver.close();
    }
}

testQueries();