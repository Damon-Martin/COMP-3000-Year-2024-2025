import Link from 'next/link';
import { useState } from 'react';

export default function MobileLoggedOutNavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#D9D9D9] shadow-md p-4">
            <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex-grow"></div>
                <button className="text-black focus:outline-none">
                    {isOpen ? '✖' : '☰'}
                </button>
            </div>
            {isOpen && (
                <div className="mt-2 flex flex-col gap-2">
                    <Link href="/login">
                        <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                            Login
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                            Home Page
                        </div>
                    </Link>
                    <Link href="/settings">
                        <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                            Settings
                        </div>
                    </Link>
                    <Link href="/">
                        <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                            Basket
                        </div>
                    </Link>
                </div>
            )}
        </nav>
    );
}