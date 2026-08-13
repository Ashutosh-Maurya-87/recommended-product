import {
    Boxes,
    Network,
    Users,
    Layers,
} from "lucide-react";

import { Stats } from "../types/product";

interface Props {
    stats: Stats | null;
}

const icons = [
    Boxes,
    Network,
    Users,
    Layers,
];

export default function StatsCards({
    stats,
}: Props) {
    const products =
        stats?.nodeCounts.find(
            (item) => item.type === "Product"
        )?.count || 0;

    const users =
        stats?.nodeCounts.find(
            (item) => item.type === "User"
        )?.count || 0;

    const categories =
        stats?.nodeCounts.find(
            (item) => item.type === "Category"
        )?.count || 0;

    const items = [
        {
            label: "Products",
            value: products,
        },
        {
            label: "Users",
            value: users,
        },
        {
            label: "Categories",
            value: categories,
        },
        {
            label: "Relationships",
            value: stats?.totalRelationships || 0,
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {items.map((item, index) => {
                const Icon = icons[index];

                return (
                    <div
                        key={item.label}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">
                                    {item.label}
                                </p>

                                <p className="mt-2 text-2xl font-bold text-slate-900">
                                    {item.value}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors duration-200 group-hover:bg-slate-100">
                                <Icon
                                    size={20}
                                    className="text-slate-700"
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}