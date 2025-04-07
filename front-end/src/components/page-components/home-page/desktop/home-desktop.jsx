'use client'

import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import SupportButton from "@/components/regular-components/all-pages/support-btn/support-btn";
import CategorySideBar from "@/components/regular-components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/regular-components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";
import { useEffect, useState } from "react";

// Desktop variant: Page is more horizontal
export default function HomeDesktop({ isLoggedIn }) {
    const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
    const [isDyslexicFont, setIsDyslexicFont] = useState(false);

    // Desktop variant: Page is more horizontal
    useEffect(() => {
        let sizeMultiplier = localStorage.getItem("font-size-multiplier");
    
        // If there is no multiplier, setting it to 1
        if (sizeMultiplier === null) {
            sizeMultiplier = "1";
            localStorage.setItem("font-size-multiplier", sizeMultiplier);
        }
    
        // Parsing and setting the multiplier
        const parsedSizeMultiplier = Number(sizeMultiplier);
        if (!isNaN(parsedSizeMultiplier)) {
            setFontSizeMultiplier(parsedSizeMultiplier);
        }
    }, []);
    
    // Dyslexic Font Changer (if enabled)
    useEffect(() => {
        const isDyslexicFont =  JSON.parse(localStorage.getItem("dyslexic-font"));
        if (isDyslexicFont === true) {
            setIsDyslexicFont(true);
        }
    }, []);

    // Defining Fonts
    const dyslexicFont = "Open-Dyslexic";
    const defaultFont = "Arial, sans-serif";

    // Set the root font size based on the fontSizeMultiplier
    const rootFontSize = `${16 * fontSizeMultiplier}px`;

    const styleSettings = { 
        fontFamily: isDyslexicFont ? dyslexicFont : defaultFont,
    };


    // using calc rem * multiplier, to scale a large font
    return (
        <div style={styleSettings}>
            <HeaderBar />
            {isLoggedIn ? <DesktopNavBar /> : <DesktopLoggedOutNavBar />}
            <main className="flex flex-row">
                <div id="Best Selling">
                    <p style={{ fontSize: `calc(1.25rem * ${fontSizeMultiplier})` }}>Best Selling</p>
                    <p style={{fontSize: rootFontSize}}>Standard font size here</p>
                </div>
                <div className="ml-auto">
                    <CategorySideBar fontSizeMultiplier={fontSizeMultiplier} />
                </div>
            </main>
            <SupportButton />
        </div>
    );
}
