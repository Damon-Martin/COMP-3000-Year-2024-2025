'use client';

import { useState, useEffect } from "react";

import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import SearchBar from "@/components/regular-components/search-bar/search-bar";

export default function SearchPage({ searchParams }) {
    const [query, setQuery] = useState(searchParams.query || "");

    useEffect(() => {
        setQuery(searchParams.query || "");
    }, [searchParams.query]);

    return (
        <div>
            <NavBarSwitcher />
            <SearchBar query={query} setQuery={setQuery} />
            <main className="flex bg-white min-h-[67dvh]">
                <p>query: {query}</p>
            </main>
        </div>
    );
}
