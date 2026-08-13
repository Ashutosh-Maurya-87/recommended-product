
export const GET_PRODUCT_GRAPH_QUERY = `
  MATCH (p:Product {id: $productId})

  OPTIONAL MATCH path = (p)-[*1..2]-(connected)

  WITH p, collect(DISTINCT path) AS paths

  RETURN
    p,
    paths
`;