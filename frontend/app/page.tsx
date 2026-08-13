"use client";

import { useEffect, useState } from "react";

import {
  getCategories,
  getProducts,
  getStats,
  searchProducts,
} from "./lib/api";

import {
  Category,
  Product,
  Stats,
} from "./types/product";

import SearchBar from "./components/SearchBar";
import StatsCards from "./components/StatsCards";
import ProductGrid from "./components/ProductGrid";

export default function Home() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [stats, setStats] = useState<Stats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [
          productData,
          statsData,
          categoryData,
        ] = await Promise.all([
          getProducts(),
          getStats(),
          getCategories(),
        ]);

        setProducts(productData);
        setStats(statsData);
        setCategories(categoryData);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to connect to the RecomGraph API."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function handleSearch(
    value: string
  ) {
    setSearch(value);

    if (!value.trim()) {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError(
          "Unable to load products."
        );
      }

      return;
    }

    try {
      const data =
        await searchProducts(value);

      setProducts(data);
    } catch {
      setError(
        "Search failed. Please try again."
      );
    }
  }

  async function handleCategoryChange(
    category: string
  ) {
    try {
      setSelectedCategory(category);
      setLoading(true);
      setError("");

      const data = await getProducts(
        category || undefined
      );

      setProducts(data);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to filter products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-slate-800/50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-slate-800/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              Graph-powered product discovery
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover products through
              <span className="mt-2 block text-slate-400">
                meaningful connections.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              RecomGraph uses relationships between
              shoppers, products, categories and brands
              to find recommendations that traditional
              product lists can miss.
            </p>

            {/* Search */}
            <div className="mt-10 max-w-2xl">
              <SearchBar
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <StatsCards stats={stats} />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-900" />

              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Explore
              </p>
            </div>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Product collection
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Browse products and discover recommendations
              based on real connections between shoppers,
              products, brands and categories.
            </p>
          </div>

          <div className="self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 sm:self-auto">
            {products.length} products
          </div>
        </div>

        {categories.length > 0 && (
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Categories
              </p>

              {selectedCategory && (
                <button
                  onClick={() =>
                    handleCategoryChange("")
                  }
                  className="text-xs font-medium text-slate-500 transition hover:text-slate-900"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() =>
                  handleCategoryChange("")
                }
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${selectedCategory === ""
                  ? "bg-slate-950 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950"
                  }`}
              >
                All products
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    handleCategoryChange(
                      category.name
                    )
                  }
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${selectedCategory === category.name
                    ? "bg-slate-950 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-sm">
                !
              </div>

              <div>
                <p className="text-sm font-semibold text-red-800">
                  Something went wrong
                </p>

                <p className="mt-1 text-sm leading-5 text-red-600">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {selectedCategory
                ? `${selectedCategory} products`
                : "All products"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {products.length} products found
            </p>
          </div>
        </div> */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  {/* Image skeleton */}
                  <div className="aspect-[4/3] animate-pulse bg-slate-200" />

                  {/* Content skeleton */}
                  <div className="space-y-4 p-4">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />

                    <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />

                    <div className="flex items-center justify-between">
                      <div className="h-6 w-20 animate-pulse rounded bg-slate-200" />

                      <div className="h-6 w-14 animate-pulse rounded-full bg-slate-100" />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <ProductGrid products={products} />
        )}


        {!loading && products.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">

            <h3 className="mt-5 text-base font-semibold text-slate-900">
              No products found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              We couldn't find products matching your
              current search or category. Try another
              category or search term.
            </p>

            {selectedCategory && (
              <button
                onClick={() =>
                  handleCategoryChange("")
                }
                className="mt-5 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                View all products
              </button>
            )}
          </div>
        )}


      </section>
    </main>
  );
}