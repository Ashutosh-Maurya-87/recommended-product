import ProductCard from "./ProductCard";

import { Product } from "../types/product";

interface Props {
    products: Product[];
}

export default function ProductGrid({
    products,
}: Props) {
    if (products.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <h3 className="font-semibold text-slate-900">
                    No products found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                    Try another search or category.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}