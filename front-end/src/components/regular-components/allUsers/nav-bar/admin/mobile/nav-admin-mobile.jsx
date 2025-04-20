import Link from 'next/link';
import { useState } from 'react';

export default function MobileAdminNavBar() {
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
                <Link href="/admin/add-item" ariaLabel="Add Item">
                    <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                        Add Item
                    </div>
                </Link>
                <Link href="/admin/update-item" ariaLabel="Update Item">
                    <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                        Update Item
                    </div>
                </Link>
                <Link href="/admin/delete-item" ariaLabel="Delete Item">
                    <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                        Delete Item
                    </div>
                </Link>
                <Link href="/admin/add-category" ariaLabel="Add Category">
                    <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                        Add Category
                    </div>
                </Link>
                <Link href="/admin/update-category" ariaLabel="Update Category">
                    <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                        Update Category
                    </div>
                </Link>
                <Link href="/admin/delete-category" ariaLabel="Delete Category">
                    <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                        Delete Category
                    </div>
                </Link>
                <Link href="/" ariaLabel="link to Home Page">
                    <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                        Home Page
                    </div>
                </Link>
                <Link href="/settings" ariaLabel="link to Settings Page">
                    <div className="text-black py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer">
                        Settings
                    </div>
                </Link>
            </div>            
            )}
        </nav>
    );
}