"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({
    value,
    onChange,
}: Props) {
    const [inputValue, setInputValue] = useState(value);

    // Keep local input synchronized with the parent value
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // Debounce search API trigger
    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue !== value) {
                onChange(inputValue);
            }
        }, 400);

        return () => {
            clearTimeout(timer);
        };
    }, [inputValue, value, onChange]);

    const handleClear = () => {
        setInputValue("");
        onChange("");
    };

    return (
        <div className="relative">
            <Search
                size={20}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            />

            <input
                value={inputValue}
                onChange={(event) =>
                    setInputValue(event.target.value)
                }
                placeholder="Search products..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />

            {inputValue && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label="Clear search"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}