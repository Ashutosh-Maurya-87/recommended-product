import Image from "next/image";
import Link from "next/link";

import { Star, ArrowUpRight } from "lucide-react";

import { Product } from "../types/product";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* View Product */}
        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:bg-white">
          <ArrowUpRight
            size={16}
            className="text-slate-700 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
          {product.name}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          {/* Price */}
          <span className="text-lg font-bold tracking-tight text-slate-950">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {/* Rating */}
          <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
            <Star
              size={13}
              className="fill-yellow-400 text-yellow-400"
            />

            {product.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}