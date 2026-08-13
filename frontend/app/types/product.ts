export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
}

export interface Recommendation extends Product {
    sharedBuyers?: number;
}

export interface Category {
    id: string;
    name: string;
}

export interface Brand {
    id: string;
    name: string;
}

export interface Stats {
    totalNodes: number;
    totalRelationships: number;
    nodeCounts: {
        type: string;
        count: number;
    }[];
}

export interface GraphNode {
    id: string;
    label: string;
    type: string;
    properties?: Record<string, unknown>;
}

export interface GraphEdge {
    id: string;
    source: string;
    target: string;
    type: string;
}

export interface GraphData {
    nodes: GraphNode[];
    edges: GraphEdge[];
}