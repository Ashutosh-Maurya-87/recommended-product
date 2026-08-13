export const GET_PRODUCTS_QUERY = `
  MATCH (p:Product)
  RETURN
    p.id AS id,
    p.name AS name,
    p.description AS description,
    p.price AS price,
    p.rating AS rating,
    p.image AS image
  ORDER BY p.name
  LIMIT $limit
`;

export const GET_PRODUCTS_BY_CATEGORY_QUERY = `
  MATCH (p:Product)-[:BELONGS_TO]->(c:Category)

  WHERE toLower(c.name) = toLower($category)

  RETURN
    p.id AS id,
    p.name AS name,
    p.description AS description,
    p.price AS price,
    p.rating AS rating,
    p.image AS image
  ORDER BY p.name
  LIMIT $limit
`;

export const GET_PRODUCT_BY_ID_QUERY = `
  MATCH (p:Product {id: $productId})
  RETURN
    p.id AS id,
    p.name AS name,
    p.description AS description,
    p.price AS price,
    p.rating AS rating,
    p.image AS image
`;

export const SEARCH_PRODUCTS_QUERY = `
  MATCH (p:Product)
  WHERE
    toLower(p.name) CONTAINS toLower($search)
    OR toLower(p.description) CONTAINS toLower($search)

  RETURN
    p.id AS id,
    p.name AS name,
    p.description AS description,
    p.price AS price,
    p.rating AS rating,
    p.image AS image

  ORDER BY p.rating DESC
  LIMIT $limit
`;

export const GET_CATEGORIES_QUERY = `
  MATCH (c:Category)
  RETURN
    c.id AS id,
    c.name AS name
  ORDER BY c.name
`;

export const GET_BRANDS_QUERY = `
  MATCH (b:Brand)
  RETURN
    b.id AS id,
    b.name AS name
  ORDER BY b.name
`;