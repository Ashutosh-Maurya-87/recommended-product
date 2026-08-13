import { driver } from "../db/driver";

import { GET_PRODUCT_GRAPH_QUERY } from "../queries/graph.queries";

import {
  GraphData,
  GraphNode,
  GraphEdge,
} from "../types/graph";

export async function getProductGraph(
  productId: string
): Promise<GraphData> {
  const session = driver.session();

  try {
    const result = await session.run(
      GET_PRODUCT_GRAPH_QUERY,
      {
        productId,
      }
    );

    if (result.records.length === 0) {
      return {
        nodes: [],
        edges: [],
      };
    }

    const nodes = new Map<string, GraphNode>();
    const edges = new Map<string, GraphEdge>();

    for (const record of result.records) {
      const product = record.get("p");

      if (product) {
        nodes.set(product.properties.id, {
          id: product.properties.id,
          label: product.properties.name,
          type: "Product",
          properties: product.properties,
        });
      }

      const paths = record.get("paths") || [];

      for (const path of paths) {
        if (!path) continue;

        for (const node of path.segments) {
          const startNode = node.start;
          const endNode = node.end;
          const relationship = node.relationship;

          nodes.set(startNode.properties.id, {
            id: startNode.properties.id,
            label:
              startNode.properties.name ||
              startNode.properties.id,
            type: startNode.labels?.[0] || "Node",
            properties: startNode.properties,
          });

          nodes.set(endNode.properties.id, {
            id: endNode.properties.id,
            label:
              endNode.properties.name ||
              endNode.properties.id,
            type: endNode.labels?.[0] || "Node",
            properties: endNode.properties,
          });

          const edgeId = `${relationship.elementId}`;

          edges.set(edgeId, {
            id: edgeId,
            source: startNode.properties.id,
            target: endNode.properties.id,
            type: relationship.type,
          });
        }
      }
    }

    return {
      nodes: Array.from(nodes.values()),
      edges: Array.from(edges.values()),
    };
  } finally {
    await session.close();
  }
}