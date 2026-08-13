export const CREATE_VIEWED_RELATIONSHIP = `
  MATCH (u:User {id: $userId})
  MATCH (p:Product {id: $productId})

  MERGE (u)-[:VIEWED]->(p)

  RETURN
    u.id AS userId,
    p.id AS productId,
    'VIEWED' AS type
`;

export const CREATE_LIKED_RELATIONSHIP = `
  MATCH (u:User {id: $userId})
  MATCH (p:Product {id: $productId})

  MERGE (u)-[:LIKED]->(p)

  RETURN
    u.id AS userId,
    p.id AS productId,
    'LIKED' AS type
`;

export const CREATE_PURCHASED_RELATIONSHIP = `
  MATCH (u:User {id: $userId})
  MATCH (p:Product {id: $productId})

  MERGE (u)-[:PURCHASED]->(p)

  RETURN
    u.id AS userId,
    p.id AS productId,
    'PURCHASED' AS type
`;