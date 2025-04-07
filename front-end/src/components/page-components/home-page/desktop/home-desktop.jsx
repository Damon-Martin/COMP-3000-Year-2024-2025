'use client'

import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import SupportButton from "@/components/regular-components/all-pages/support-btn/support-btn";
import CategorySideBar from "@/components/regular-components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/regular-components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";
import { useEffect, useState } from "react";


// Desktop variant: Page is more horizontal
export default function HomeDesktop({ isLoggedIn }) {
    const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1)
    const [isDyslexicFont, setIsDyslexicFont] = useState(false)

    // Custom fontSizeMultiplier
    useEffect(() => {
        const sizeMultiplier = localStorage.getItem("font-size-multiplier")
        
        // Check if the parsed value is a valid number
        const parsedSizeMultiplier = Number(sizeMultiplier)
        if (!isNaN(parsedSizeMultiplier)) {
            setFontSizeMultiplier(parsedSizeMultiplier)
        }
    }, [])
    
    // Dyslexic Font Changer (if enabled)
    useEffect(() => {
        const isDyslexicFont =  JSON.parse(localStorage.getItem("dyslexic-font"))

        if (isDyslexicFont === true) {
            setIsDyslexicFont(true)
        }
    }, [])


    // Defining Fonts
    const dyslexicFont = "Open-Dyslexic";
    const defaultFont = "Arial, sans-serif";

    return (
        <div style={{ fontFamily: isDyslexicFont ? dyslexicFont : defaultFont }}>
            <HeaderBar />
            {isLoggedIn ? <DesktopNavBar /> : <DesktopLoggedOutNavBar />}
            <main className="flex flex-row">
                <div id="Best Selling">
                    <p>Best Selling</p>
                </div>
                <div className="ml-auto">
                    <CategorySideBar />
                </div>
            </main>
            <SupportButton />
        </div>
    );
}