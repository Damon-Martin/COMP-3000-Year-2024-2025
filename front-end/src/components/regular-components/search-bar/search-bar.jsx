import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ widthDVW }) {
    const [query, setQuery] = useState(''); // Contains text from form
    const router = useRouter();

    const handleSearch = () => {
        // Requires a query to redirect
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
            className="flex m-1 border rounded-lg overflow-hidden shadow-sm"
            style={{ width: `${widthDVW}dvw` }}
        >
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                onKeyDown={handleKeyDown}
                className="text-black flex-grow p-2 outline-none transition duration-200 hover:bg-gray-100" 
                placeholder="Search..." 
            />
            <button onClick={handleSearch} className="bg-[#FF4D00] hover:bg-[#c21300] px-4 py-1 text-white">
                Search
            </button>
        </div>
    );
}