'use client'

import Link from 'next/link'
import NavBtn from '../../buttons/nav-btn';
import SearchBar from '@/components/regular-components/allUsers/search-bar/search-bar';

export default function DesktopNavBar() {
    // Desktop Varient
    return (
        <div className="bg-[#D9D9D9] text-black p-1 w-full flex items-center justify-between">
            <SearchBar widthVW={93}/>
            {/* Right-aligned Links */}
            <div className="ml-auto flex items-center">
                <NavBtn size={28} redirectURL="/" altTxt="Home Page" svgLocation="/images/shop-icon/shop-icon.svg" activeSvgLocation="/images/shop-icon/shop-active.svg"  />
                <NavBtn size={28} redirectURL="/account" altTxt="Account Page" svgLocation="/images/account-icon/account-icon.svg" activeSvgLocation="/images/account-icon/account-active.svg" />
                <NavBtn size={28} redirectURL="/settings" altTxt="Settings Page" svgLocation="/images/settings-icon/settings-icon.svg" activeSvgLocation="/images/settings-icon/settings-active.svg"  />
                <NavBtn size={28} redirectURL="/basket" altTxt="Basket Page" svgLocation="/images/basket-icon/basket-icon.svg" activeSvgLocation="/images/basket-icon/basket-active.svg"  />
            </div>
        </div>
    );
  }