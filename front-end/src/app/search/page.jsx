'use client';

import { useState, useEffect } from "react";

import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import SearchBar from "@/components/regular-components/search-bar/search-bar";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function SearchPage({ searchParams }) {
    const [query, setQuery] = useState(searchParams.query || "");
    const [itemList, setItemList] = useState([]); // Stores Fetched item list

    useEffect(() => {
        setQuery(searchParams.query || "");
    }, [searchParams.query]);

    useEffect(() => {
        const fetchQuery = async () => {
            if (!query) return;

            try {
                const res = await fetch(`${BackendURI}/v1/items/search?query=${query}`);

                const data = await res.json();
                setItemList(data.items);
                console.log(data.items);
            } 
            catch (e) {
                console.error("Error fetching data:", e);
            }
        };

        fetchQuery();
    }, [query, BackendURI]);

    return (
        <div>
            <NavBarSwitcher />
            <main className="flex bg-white min-h-[67dvh]">
                <p>query: {query}</p>
            </main>
        </div>
    );
}
