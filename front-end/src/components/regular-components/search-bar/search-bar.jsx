import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
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
        <div className="flex w-90dvw m-3 border rounded-lg overflow-hidden shadow-sm">
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                onKeyDown={handleKeyDown}
                className="text-black flex-grow p-2 outline-none" 
                placeholder="Search..." 
            />
            <button onClick={handleSearch} className="bg-[#FF4D00] hover:bg-[#c21300] px-4 py-2 text-white">
                Search
            </button>
        </div>
    );
}