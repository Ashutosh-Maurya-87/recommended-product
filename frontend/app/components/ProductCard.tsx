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
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm">
          <ArrowUpRight
            size={16}
            className="text-slate-700"
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className="flex items-center gap-1 text-sm text-slate-600">
            <Star
              size={15}
              className="fill-yellow-400 text-yellow-400"
            />

            {product.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}