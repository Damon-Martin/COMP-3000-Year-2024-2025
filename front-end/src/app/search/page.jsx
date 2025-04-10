'use client'

import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import SearchBar from "@/components/regular-components/search-bar/search-bar";

export default function SearchPage({ searchParams }) {
    const query = searchParams.query;

    return (
        <div>
            <NavBarSwitcher />
            <SearchBar />
            <main className="flex flex-row">
                <p>query: {query}</p>
            </main>
        </div>
    );
}
