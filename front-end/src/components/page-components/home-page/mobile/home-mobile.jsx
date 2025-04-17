'use client'

import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import CategorySideBar from "@/components/regular-components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/regular-components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";
import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import SearchBar from "@/components/regular-components/search-bar/search-bar";
import SearchResultButtonMobile from "@/components/regular-components/search-page/result-button.jsx/mobile/search-result-button";

import { useState, useEffect } from "react";
import Link from 'next/link'

// Mobile Variant of the Page
// Content is more vertical
export default function HomeMobile({ ItemList }) {

    return (
        <div>
            <NavBarSwitcher />
            <SearchBar />
            <main className="flex flex-col">
                <p>Best Selling</p>
                <Link href="/categories" className="bg-[#FF4D00] hover:bg-[#c21300] text-white m-3 ml-0 h-[20vh] w-[94vw] mr-3 ml-3 rounded-lg flex items-center justify-center">
                    <p>Categories</p>
                </Link>
                {ItemList.map(currentItem => (
                    <SearchResultButtonMobile
                        item={currentItem}
                        name={currentItem.name}
                        price={currentItem.price}
                        imageURL={currentItem.imageUrl}
                        altTxtImage={currentItem.altImgTxt}
                    />
                ))}
            </main>
        </div>
        
    );
}