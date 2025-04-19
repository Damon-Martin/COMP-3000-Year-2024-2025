'use client'

import { useState, useEffect } from "react";
import "./globals.css";

// Import the metadata from the separate file
import { metadata } from './metadata';
import HeaderBar from "@/components/regular-components/allUsers/all-pages/header-bar/header-bar";
import DesktopLoggedOutNavBar from "@/components/regular-components/allUsers/nav-bar/logged-out/desktop/nav-desktop";

export default function RootLayout({ children }) {
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);

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
    fontFamily: isDyslexicFont ? dyslexicFont : defaultFont
  };

  useEffect(() => {
    const handleFocus = (e) => {
      const el = e.target;
      let text = "";
  
      const getAriaText = (element) => {
        if (!element) return "";
  
        // Checking aria-label to be read out loud
        if (element.hasAttribute("aria-label")) {
          return element.getAttribute("aria-label");
        }
  
        // Checking element for aria-labelledby to be read out loud
        if (element.hasAttribute("aria-labelledby")) {
          const id = element.getAttribute("aria-labelledby");
          const labelEl = document.getElementById(id);
          if (labelEl) {
            return labelEl.innerText || labelEl.textContent || "";
          }
        }
  
        // Checking the children recursively for the aria tag
        for (const child of element.children) {
          const childText = getAriaText(child);
          if (childText) return childText;
        }
  
        return "";
      };
  
      text = getAriaText(el);
  
      if (text.trim()) {
        const utterance = new SpeechSynthesisUtterance(text.trim());
        utterance.lang = "en-US";
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      }
    };
  
    document.addEventListener("focusin", handleFocus);
  
    return () => {
      document.removeEventListener("focusin", handleFocus);
    };
  }, []);  

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