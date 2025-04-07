'use client'

import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import LoginCard from "@/components/regular-components/login/login-card-center/login-card";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";

import { useState, useEffect } from "react";

// Desktop variant: Page is more horizontal
export default function LoginDesktop() {
    const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
    const [isDyslexicFont, setIsDyslexicFont] = useState(false);

    // Fetching font size multiplier from localStorage
    useEffect(() => {
        let sizeMultiplier = localStorage.getItem("font-size-multiplier");
    
        // Default to 1 if null
        if (!sizeMultiplier) {
            sizeMultiplier = "1";
            localStorage.setItem("font-size-multiplier", sizeMultiplier);
        }

        // Converting to a number and setting state
        const parsedSizeMultiplier = Number(sizeMultiplier);
        if (!isNaN(parsedSizeMultiplier)) {
            setFontSizeMultiplier(parsedSizeMultiplier);
        }
    }, []);

    // Fetching dyslexic font preference
    useEffect(() => {
        const dyslexicFontSetting = JSON.parse(localStorage.getItem("dyslexic-font")) || false;
        setIsDyslexicFont(dyslexicFontSetting);
    }, []);

    // Font styles
    const dyslexicFont = "Open-Dyslexic";
    const defaultFont = "Arial, sans-serif";

    // Dynamic root font size
    const styleSettings = { 
        fontFamily: isDyslexicFont ? dyslexicFont : defaultFont,
        fontSize: `${16 * fontSizeMultiplier}px`
    };

    return (
        <div style={styleSettings}>
            <HeaderBar />
            <DesktopLoggedOutNavBar />
            <main className="flex flex-row justify-center items-center">
                <LoginCard />
            </main>
        </div>
    );
}
