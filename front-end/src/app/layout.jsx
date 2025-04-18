'use client'

import { useState, useEffect } from "react";
import "./globals.css";

// Import the metadata from the separate file
import { metadata } from './metadata';
import HeaderBar from "@/components/regular-components/allUsers/all-pages/header-bar/header-bar";
import DesktopLoggedOutNavBar from "@/components/regular-components/allUsers/nav-bar/logged-out/desktop/nav-desktop";

export default function RootLayout({ children }) {
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
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body style={styleSettings} className="overflow-auto min-w-screen min-h-screen min-h-screen max-h-screen">
        <HeaderBar />
        {children}
      </body>
    </html>
  );
}