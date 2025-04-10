'use client'

import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import CategorySideBar from "@/components/regular-components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/regular-components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";
import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import SearchBar from "@/components/regular-components/search-bar/search-bar";

import { useState, useEffect } from "react";

// Mobile Variant of the Page
// Content is more vertical
export default function HomeMobile({ isLoggedIn }) {


    return (
        <div>
            <NavBarSwitcher />
            <SearchBar />
            <main className="flex flex-row">
                <h1>Best Selling</h1>
            </main>
        </div>
        
    );
}