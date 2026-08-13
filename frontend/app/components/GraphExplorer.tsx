"use client";

import { useMemo, useEffect } from "react";

import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    Position,
    useNodesState,
    useEdgesState,
} from "reactflow";

import type {
    Node,
    Edge,
} from "reactflow";

import "reactflow/dist/style.css";

import { GraphData } from "../types/product";

interface Props {
    data: GraphData;
}

const MAX_VISIBLE_NODES = 25;

export default function GraphExplorer({
    data,
}: Props) {
    const [flowNodes, setFlowNodes, onNodesChange] = useNodesState([]);

    const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState([]);
    /*
     * Keep the graph readable.
     *
     * Our database may return a large number of
     * nodes because we are traversing up to 2 hops.
     * Showing every node makes the visualization
     * unreadable.
     */
    const visibleNodes = useMemo(() => {
        return data.nodes.slice(
            0,
            MAX_VISIBLE_NODES
        );
    }, [data.nodes]);

    const visibleNodeIds = useMemo(() => {
        return new Set(
            visibleNodes.map((node) => node.id)
        );
    }, [visibleNodes]);

    /*
     * Position nodes in layers instead of putting
     * everything on the same small circle.
     */
    const nodes: Node[] = useMemo(() => {
        if (visibleNodes.length === 0) {
            return [];
        }

        const centerNode = visibleNodes[0];

        const otherNodes = visibleNodes.slice(1);

        /*
         * Group nodes by type.
         */
        const users = otherNodes.filter(
            (node) => node.type === "User"
        );

        const categories = otherNodes.filter(
            (node) => node.type === "Category"
        );

        const brands = otherNodes.filter(
            (node) => node.type === "Brand"
        );

        const products = otherNodes.filter(
            (node) => node.type === "Product"
        );

        const unknown = otherNodes.filter(
            (node) =>
                ![
                    "User",
                    "Category",
                    "Brand",
                    "Product",
                ].includes(node.type)
        );

        const result: Node[] = [];

        /*
         * CENTER PRODUCT
         */
        result.push({
            id: centerNode.id,

            position: {
                x: 500,
                y: 300,
            },

            data: {
                label: (
                    <div className="min-w-[150px] text-center">
                        <div className="text-xs font-medium text-slate-400">
                            {centerNode.type}
                        </div>

                        <div className="mt-1 font-bold text-white">
                            {centerNode.label}
                        </div>
                    </div>
                ),
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,

            style: {
                width: 180,
                background: "#0f172a",
                border: "2px solid #475569",
                borderRadius: 16,
                padding: 14,
                color: "white",
            },
        });

        /*
         * Helper for arranging nodes in a circle.
         */
        function addCircularNodes(
            nodeList: typeof otherNodes,
            radius: number,
            centerX: number,
            centerY: number,
            startAngle: number,
            nodeType: string
        ) {
            nodeList.forEach((node, index) => {
                const total = nodeList.length;

                const angle =
                    startAngle +
                    (index / Math.max(total, 1)) *
                    Math.PI *
                    2;

                result.push({
                    id: node.id,

                    position: {
                        x:
                            centerX +
                            Math.cos(angle) * radius,
                        y:
                            centerY +
                            Math.sin(angle) * radius,
                    },

                    data: {
                        label: (
                            <div className="min-w-[130px]">
                                <div className="text-[11px] font-medium text-slate-400">
                                    {nodeType}
                                </div>

                                <div className="mt-1 text-sm font-semibold text-white">
                                    {node.label}
                                </div>
                            </div>
                        ),
                    },

                    sourcePosition: Position.Right,
                    targetPosition: Position.Left,

                    style: {
                        width: 155,
                        background: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: 14,
                        padding: 12,
                        color: "white",
                    },
                });
            });
        }

        /*
         * USERS
         *
         * Put users on the left.
         */
        addCircularNodes(
            users,
            330,
            500,
            300,
            Math.PI * 0.8,
            "User"
        );

        /*
         * CATEGORIES
         *
         * Put categories above the product.
         */
        addCircularNodes(
            categories,
            280,
            500,
            300,
            -Math.PI * 0.9,
            "Category"
        );

        /*
         * BRANDS
         *
         * Put brands below the product.
         */
        addCircularNodes(
            brands,
            280,
            500,
            300,
            Math.PI * 0.1,
            "Brand"
        );

        /*
         * OTHER PRODUCTS
         *
         * Put related products on the right.
         */
        addCircularNodes(
            products,
            350,
            500,
            300,
            -Math.PI * 0.45,
            "Product"
        );

        /*
         * Unknown node types.
         */
        addCircularNodes(
            unknown,
            400,
            500,
            300,
            Math.PI * 0.5,
            "Node"
        );

        return result;
    }, [visibleNodes]);

    /*
     * Only draw edges where both nodes are visible.
     */
    const edges: Edge[] = useMemo(() => {
        return data.edges
            .filter(
                (edge) =>
                    visibleNodeIds.has(edge.source) &&
                    visibleNodeIds.has(edge.target)
            )
            .map((edge) => ({
                id: edge.id,
                source: edge.source,
                target: edge.target,

                label: edge.type,

                animated: false,

                style: {
                    stroke: "#64748b",
                    strokeWidth: 1.5,
                },

                labelStyle: {
                    fill: "#475569",
                    fontSize: 9,
                    fontWeight: 600,
                },

                labelBgStyle: {
                    fill: "#f8fafc",
                    fillOpacity: 0.85,
                },
            }));
    }, [data.edges, visibleNodeIds]);

    useEffect(() => {
        setFlowNodes(nodes);
    }, [nodes, setFlowNodes]);

    useEffect(() => {
        setFlowEdges(edges);
    }, [edges, setFlowEdges]);

    if (data.nodes.length === 0) {
        return (
            <div className="flex h-125 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                <p className="text-sm text-slate-500">
                    No graph relationships found.
                </p>
            </div>
        );
    }

    return (
        <div className="relative h-[600px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <ReactFlow
                nodes={flowNodes}
                edges={flowEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodesDraggable={true}
                nodesConnectable={false}
                elementsSelectable={true}
                fitView
                fitViewOptions={{
                    padding: 0.2,
                    minZoom: 0.5,
                    maxZoom: 1.2,
                }}
            >
                <Background />

                <Controls />

                <MiniMap />
            </ReactFlow>

            {data.nodes.length >
                MAX_VISIBLE_NODES && (
                    <div className="absolute bottom-4 left-4 rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-xs text-slate-600 shadow-sm">
                        Showing {MAX_VISIBLE_NODES} of{" "}
                        {data.nodes.length} connected nodes
                    </div>
                )}
        </div>
    );
}