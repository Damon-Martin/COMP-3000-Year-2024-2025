'use client'

import Link from 'next/link'
import NavBtn from '../../buttons/nav-btn';
import SearchBar from '@/components/regular-components/allUsers/search-bar/search-bar';

export default function DesktopAdminNavBar() {
    // Desktop Varient
    return (
        <div className="bg-[#D9D9D9] text-black p-1 w-full flex items-center justify-between">
            <SearchBar widthVW={93}/>
            {/* Right-aligned Links */}
            <div className="ml-auto flex items-center">
                <Link title="Add Item" aria-label="Add Item" href="/admin/add-item">Add Item</Link>
                <Link title="Update Item" aria-label="Update Item" href="/admin/update-item">Update Item</Link>
                <Link title="Delete Item" aria-label="Delete Item" href="/admin/delete-item">Delete Item</Link>
                <Link title="Add Category" aria-label="Add Category" href="/admin/add-category">Add Category</Link>
                <Link title="Update Category" aria-label="Update Category" href="/admin/update-category">Update Category</Link>
                <Link title="Delete Category" aria-label="Delete Category" href="/admin/delete-category">Delete Category</Link>
                <NavBtn size={28} redirectURL="/" ariaLabel="link to Home Page" altTxt="Home Page" svgLocation="/images/shop-icon/shop-icon.svg" activeSvgLocation="/images/shop-icon/shop-active.svg"  />
                <NavBtn size={28} redirectURL="/settings" ariaLabel="link to Settings Page" altTxt="Settings Page" svgLocation="/images/settings-icon/settings-icon.svg" activeSvgLocation="/images/settings-icon/settings-active.svg"  />
            </div>
        </div>
    );
}