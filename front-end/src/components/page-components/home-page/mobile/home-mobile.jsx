'use client'

import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import CategorySideBar from "@/components/regular-components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/regular-components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";

import { useState, useEffect } from "react";

// Mobile Variant of the Page
// Content is more vertical
export default function HomeMobile({ isLoggedIn }) {


    return (
        <main className="flex flex-row">
            <h1>Best Selling</h1>
        </main>
    );
}