export const GET_RECOMMENDATIONS_QUERY = `
  MATCH (p:Product {id: $productId})
        <-[:PURCHASED]-(user:User)
        -[:PURCHASED]->(recommended:Product)

  WHERE recommended.id <> $productId

  RETURN
    recommended.id AS id,
    recommended.name AS name,
    recommended.price AS price,
    recommended.rating AS rating,
    recommended.image AS image,
    count(DISTINCT user) AS sharedBuyers

  ORDER BY sharedBuyers DESC, recommended.rating DESC

  LIMIT $limit
`;

export const GET_CATEGORY_RECOMMENDATIONS_QUERY = `
  MATCH (p:Product {id: $productId})
        -[:BELONGS_TO]->(category:Category)
        <-[:BELONGS_TO]-(recommended:Product)

  WHERE recommended.id <> $productId

  RETURN
    recommended.id AS id,
    recommended.name AS name,
    recommended.price AS price,
    recommended.rating AS rating,
    recommended.image AS image,
    category.name AS category

  ORDER BY recommended.rating DESC

  LIMIT $limit
`;