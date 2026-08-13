"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import GraphExplorer from "../../components/GraphExplorer";

import {
    ArrowLeft,
    Heart,
    ShoppingCart,
    Eye,
    Star,
    Database,
} from "lucide-react";

import {
    getProduct,
    getRecommendations,
    getGraph,
    createInteraction,
    InteractionType,
} from "../../lib/api";

import {
    Product,
    Recommendation,
    GraphData,
} from "../../types/product";

import ProductCard from "../../components/ProductCard";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function ProductDetails({
    params,
}: Props) {
    const [productId, setProductId] = useState("");
    const [product, setProduct] =
        useState<Product | null>(null);

    const [recommendations, setRecommendations] =
        useState<Recommendation[]>([]);

    const [graph, setGraph] =
        useState<GraphData | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [interactionLoading, setInteractionLoading] =
        useState<InteractionType | null>(null);

    const [liked, setLiked] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    useEffect(() => {
        async function loadProduct() {
            try {
                const { id } = await params;

                setProductId(id);

                const [
                    productData,
                    recommendationData,
                    graphData,
                ] = await Promise.all([
                    getProduct(id),
                    getRecommendations(id),
                    getGraph(id),
                ]);

                setProduct(productData);
                setRecommendations(
                    recommendationData
                );
                setGraph(graphData);

                /*
                 * Record product view.
                 *
                 * This is intentionally handled separately
                 * so a failed interaction does not prevent
                 * the product page from loading.
                 */
                try {
                    await createInteraction(
                        "U001",
                        id,
                        "VIEWED"
                    );
                } catch (error) {
                    console.error(
                        "Unable to record product view:",
                        error
                    );
                }
            } catch (error) {
                console.error(error);

                setError(
                    "Unable to load this product."
                );
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [params]);

    async function handleInteraction(
        type: InteractionType
    ) {
        if (!productId) {
            return;
        }

        try {
            setInteractionLoading(type);
            setMessage("");

            await createInteraction(
                "U001",
                productId,
                type
            );

            if (type === "LIKED") {
                setLiked(true);

                setMessage(
                    "Product added to your likes."
                );
            }

            if (type === "VIEWED") {
                setMessage(
                    "Product view recorded."
                );
            }

            if (type === "PURCHASED") {
                setMessage(
                    "Purchase recorded successfully."
                );
            }

            setTimeout(() => {
                setMessage("");
            }, 3000);
        } catch (error) {
            console.error(error);

            setMessage(
                "Unable to record this action. Please try again."
            );
        } finally {
            setInteractionLoading(null);
        }
    }

    /*
     * Loading state
     */
    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="h-5 w-32 animate-pulse rounded bg-slate-800" />

                    <div className="mt-10 grid gap-10 lg:grid-cols-2">
                        <div className="aspect-square animate-pulse rounded-3xl bg-slate-800" />

                        <div className="space-y-5">
                            <div className="h-10 w-3/4 animate-pulse rounded bg-slate-800" />

                            <div className="h-6 w-1/4 animate-pulse rounded bg-slate-800" />

                            <div className="h-32 animate-pulse rounded bg-slate-800" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    /*
     * Error state
     */
    if (error || !product) {
        return (
            <main className="min-h-screen bg-slate-950">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                        <ArrowLeft size={17} />
                        Back to products
                    </Link>

                    <div className="mt-10 rounded-2xl border border-red-900/60 bg-red-950/40 p-8 text-center">
                        <h2 className="font-semibold text-red-300">
                            Product unavailable
                        </h2>

                        <p className="mt-2 text-sm text-red-400">
                            {error ||
                                "This product could not be found."}
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* =====================================================
                    Breadcrumb
                ====================================================== */}

                <div className="flex items-center gap-2 text-sm">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-medium text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Products
                    </Link>

                    <span className="text-slate-700">
                        /
                    </span>

                    <span className="line-clamp-1 text-slate-500">
                        {product.name}
                    </span>
                </div>


                {/* =====================================================
                    Product
                ====================================================== */}

                <section className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">

                    {/* Product Image */}

                    <div className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Graph badge */}

                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                            <Database
                                size={13}
                            />

                            Graph connected
                        </div>
                    </div>


                    {/* Product Information */}

                    <div className="flex flex-col justify-center">

                        {/* Product label */}

                        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300">
                            Recommended through product relationships
                        </div>


                        {/* Product name */}

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            {product.name}
                        </h1>


                        {/* Price + Rating */}

                        <div className="mt-6 flex flex-wrap items-center gap-4">

                            <span className="text-3xl font-bold tracking-tight text-white">
                                ₹
                                {product.price.toLocaleString(
                                    "en-IN"
                                )}
                            </span>

                            <span className="flex items-center gap-1.5 rounded-full border border-yellow-800/60 bg-yellow-950/40 px-3 py-1.5 text-sm font-medium text-yellow-300">
                                <Star
                                    size={15}
                                    className="fill-yellow-400 text-yellow-400"
                                />

                                {product.rating}
                            </span>

                        </div>


                        {/* Description */}

                        <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
                            {product.description}
                        </p>


                        {/* =================================================
                            Actions
                        ================================================== */}

                        <div className="mt-8 flex flex-wrap gap-3">

                            {/* View */}

                            <button
                                type="button"
                                onClick={() =>
                                    handleInteraction(
                                        "VIEWED"
                                    )
                                }
                                disabled={
                                    interactionLoading !==
                                    null
                                }
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Eye size={17} />

                                {interactionLoading ===
                                    "VIEWED"
                                    ? "Recording..."
                                    : "View"}
                            </button>


                            {/* Like */}

                            <button
                                type="button"
                                onClick={() =>
                                    handleInteraction(
                                        "LIKED"
                                    )
                                }
                                disabled={
                                    interactionLoading !==
                                    null
                                }
                                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${liked
                                        ? "border border-pink-900/60 bg-pink-950/40 text-pink-300"
                                        : "border border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500 hover:bg-slate-800"
                                    }`}
                            >
                                <Heart
                                    size={17}
                                    className={
                                        liked
                                            ? "fill-pink-400 text-pink-400"
                                            : ""
                                    }
                                />

                                {interactionLoading ===
                                    "LIKED"
                                    ? "Saving..."
                                    : liked
                                        ? "Liked"
                                        : "Like"}
                            </button>


                            {/* Purchase */}

                            <button
                                type="button"
                                onClick={() =>
                                    handleInteraction(
                                        "PURCHASED"
                                    )
                                }
                                disabled={
                                    interactionLoading !==
                                    null
                                }
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ShoppingCart
                                    size={17}
                                />

                                {interactionLoading ===
                                    "PURCHASED"
                                    ? "Recording..."
                                    : "Purchase"}
                            </button>

                        </div>


                        {/* Interaction message */}

                        {message && (
                            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-300">
                                {message}
                            </div>
                        )}


                        {/* Product ID */}

                        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-4">

                            <div className="flex items-center justify-between gap-4">

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Product ID
                                    </p>

                                    <p className="mt-1 font-mono text-sm text-slate-200">
                                        {productId}
                                    </p>
                                </div>

                                <Database
                                    size={18}
                                    className="text-slate-500"
                                />

                            </div>
                        </div>

                    </div>
                </section>


                {/* =====================================================
                    Recommendations
                ====================================================== */}

                <section className="mt-20">

                    <div className="max-w-3xl">

                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />

                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                Graph-powered recommendations
                            </p>
                        </div>


                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            You may also like
                        </h2>


                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                            Recommendations are based on
                            connections between shoppers
                            and products in the graph.
                        </p>


                        {/* Explanation */}

                        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">

                            <div className="flex items-start gap-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-950">
                                    🔗
                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-white">
                                        How this recommendation works
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-slate-400">
                                        We find shoppers who
                                        purchased this product
                                        and then discover other
                                        products they purchased.
                                        These multi-hop connections
                                        are used to generate the
                                        recommendations below.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Recommendation Cards */}

                    {recommendations.length > 0 ? (

                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {recommendations.map(
                                (recommendation) => (

                                    <div
                                        key={
                                            recommendation.id
                                        }
                                        className="group"
                                    >

                                        <ProductCard
                                            product={
                                                recommendation
                                            }
                                        />


                                        {recommendation.sharedBuyers !==
                                            undefined &&
                                            recommendation.sharedBuyers >
                                            0 && (

                                                <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 transition-colors duration-200 group-hover:border-slate-700">

                                                    <div className="flex items-start gap-3">

                                                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm text-slate-950">
                                                            ✦
                                                        </div>

                                                        <div>

                                                            <p className="text-xs font-semibold text-white">
                                                                Why this was recommended
                                                            </p>

                                                            <p className="mt-1 text-xs leading-5 text-slate-400">

                                                                <span className="font-semibold text-slate-200">
                                                                    {
                                                                        recommendation.sharedBuyers
                                                                    }
                                                                </span>{" "}

                                                                shopper
                                                                {
                                                                    recommendation.sharedBuyers !==
                                                                        1
                                                                        ? "s"
                                                                        : ""
                                                                }{" "}
                                                                also purchased
                                                                this product.

                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>
                                            )}

                                    </div>
                                )
                            )}

                        </div>

                    ) : (

                        <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">

                            <p className="font-medium text-white">
                                No recommendations yet
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                There aren't enough connections
                                for this product yet.
                            </p>

                        </div>
                    )}

                </section>


                {/* =====================================================
                    Graph Explorer
                ====================================================== */}

                <section className="mt-20 pb-16">

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">

                        {/* Graph Header */}

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-slate-950">
                                    <Database
                                        size={20}
                                    />
                                </div>

                                <div>

                                    <div className="flex items-center gap-2">

                                        <span className="h-2 w-2 rounded-full bg-emerald-400" />

                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Graph explorer
                                        </p>

                                    </div>

                                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                        Explore product connections
                                    </h2>

                                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                                        See how this product connects
                                        to users, categories, brands
                                        and other products through
                                        the graph database.
                                    </p>

                                </div>

                            </div>


                            {/* Interactive Badge */}

                            <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300">

                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                                Interactive

                            </div>

                        </div>


                        {/* Graph */}

                        <div className="mt-8">

                            {graph ? (

                                <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">

                                    <GraphExplorer
                                        data={graph}
                                    />

                                    {/* Graph hint */}

                                    <div className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-xl border border-slate-700 bg-slate-900/95 px-3 py-2 text-xs text-slate-400 shadow-sm backdrop-blur-sm">
                                        Drag nodes to explore connections
                                    </div>

                                </div>

                            ) : (

                                <div className="flex h-[500px] items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 sm:h-[600px]">

                                    <div className="text-center">

                                        <Database
                                            size={28}
                                            className="mx-auto text-slate-600"
                                        />

                                        <p className="mt-3 text-sm font-medium text-white">
                                            Unable to load graph data
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Please try again later.
                                        </p>

                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                </section>

            </div>
        </main>
    );
}