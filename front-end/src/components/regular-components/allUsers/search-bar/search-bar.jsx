"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ widthVW }) {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/search?query=${query.trim()}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div
            className="flex m-1 shadow-sm"
            style={{ width: `${widthVW}vw` }}
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-black flex-grow p-2 outline-none border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 rounded-l-md transition duration-200 hover:bg-gray-100"
                placeholder="Search..."
                aria-label="Enter Search Query"
            />
            <button
                onClick={handleSearch}
                className="bg-[#FF4D00] hover:bg-[#c21300] px-4 py-2 text-white border border-gray-300 border-l-0 rounded-r-md rounded-l-none focus:bg-[#c21300] focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition duration-200"
                aria-label="Search Button"
                title="Search Button"
                onKeyDown={handleKeyDown}
            >
                Search
            </button>
        </div>
    );    
}
