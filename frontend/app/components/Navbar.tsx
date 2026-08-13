import Link from "next/link";
import { Database, Search } from "lucide-react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
                        <Database size={18} />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-slate-900">
                            RecomGraph
                        </h1>

                        <p className="hidden text-[10px] font-medium text-slate-500 sm:block">
                            Product intelligence
                        </p>
                    </div>
                </Link>

                <div className="hidden items-center gap-6 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
                    >
                        Explore
                    </Link>

                    <span className="text-sm text-slate-400">
                        Powered by CognoDB
                    </span>
                </div>
            </div>
        </header>
    );
}