export const GET_GRAPH_STATS_QUERY = `
  MATCH (n)

  WITH
    count(n) AS totalNodes

  OPTIONAL MATCH ()-[r]->()

  RETURN
    totalNodes,
    count(r) AS totalRelationships
`;

export const GET_NODE_COUNTS_QUERY = `
  MATCH (n)

  RETURN
    labels(n)[0] AS type,
    count(n) AS count

  ORDER BY type
`;