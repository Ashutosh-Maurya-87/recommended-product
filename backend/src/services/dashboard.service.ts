import { driver } from "../db/driver";

import {
  GET_GRAPH_STATS_QUERY,
  GET_NODE_COUNTS_QUERY,
} from "../queries/dashboard.queries";

export async function getDashboardStats() {
  const session = driver.session();

  try {
    const statsResult = await session.run(
      GET_GRAPH_STATS_QUERY
    );

    const nodeResult = await session.run(
      GET_NODE_COUNTS_QUERY
    );

    const stats = statsResult.records[0];

    const nodeCounts = nodeResult.records.map(
      (record) => ({
        type: record.get("type"),
        count: record.get("count").toNumber(),
      })
    );

    return {
      totalNodes:
        stats?.get("totalNodes")?.toNumber() || 0,

      totalRelationships:
        stats
          ?.get("totalRelationships")
          ?.toNumber() || 0,

      nodeCounts,
    };
  } finally {
    await session.close();
  }
}