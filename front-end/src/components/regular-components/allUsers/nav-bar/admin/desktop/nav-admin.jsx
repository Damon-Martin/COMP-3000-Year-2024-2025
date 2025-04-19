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
                <NavBtn size={28} redirectURL="/" ariaLabel="link to Home Page" altTxt="Home Page" svgLocation="/images/shop-icon/shop-icon.svg" activeSvgLocation="/images/shop-icon/shop-active.svg"  />
                <NavBtn size={28} redirectURL="/settings" ariaLabel="link to Settings Page" altTxt="Settings Page" svgLocation="/images/settings-icon/settings-icon.svg" activeSvgLocation="/images/settings-icon/settings-active.svg"  />
            </div>
        </div>
    );
}