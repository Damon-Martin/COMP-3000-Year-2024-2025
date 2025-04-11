'use client'

import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import SupportButton from "@/components/regular-components/all-pages/support-btn/support-btn";
import CategorySideBar from "@/components/regular-components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/regular-components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";
import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import { useEffect, useState } from "react";

// Desktop variant: Page is more horizontal
export default function HomeDesktop({ ItemList }) {

    return (
        <div>
            <NavBarSwitcher />
            <main className="flex flex-row justify-center">
                <div id="Best Selling" className="bg-white m-3 min-w-[82vw] max-h-[74vh] overflow-auto">
                    <p>Best Selling</p>
                    <p>Standard font size here</p>
                </div>
                <div className="ml-auto">
                    <CategorySideBar />
                </div>
                <SupportButton />
            </main>  
        </div>
    );
}
