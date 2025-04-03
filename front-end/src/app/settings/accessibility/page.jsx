"use client"

import HeaderBar from "@/components/all-pages/header-bar/header-bar";
import DesktopNavBar from "@/components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/nav-bar/logged-out/desktop/nav-desktop";
import SettingButton from "@/components/settings/setting-btn/setting-btn";

import { useState, useEffect } from "react";

export default function AccessibilitySettingsPage() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
    } 
    else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div>
      <HeaderBar />
      {isLoggedIn ? <DesktopNavBar /> : <DesktopLoggedOutNavBar />}
      <div>
        <h1 tabIndex={0} className="text-3xl">Accessibility</h1>
        <main className="flex flex-col">

        {/* Dyslexic Font Toggle */}
        <form>
            <fieldset className="space-y-4">
                <legend className="text-xl font-medium">Would you like to enable a dyslexic friendly font?</legend>
                <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <input 
                    type="radio" 
                    id="dyslexicFontTrue" 
                    value={true} 
                    name="dyslexicFont" // Same name to ensure only 1 can be selected
                    className="form-radio text-[#FF4D00]" 
                    />
                    <label htmlFor="dyslexicFontTrue" className="ml-2">Off</label>
                </div>
                <div className="flex items-center">
                    <input 
                    type="radio" 
                    id="dyslexicFontFalse" 
                    value={false} 
                    name="dyslexicFont" // Same name to ensure only 1 can be selected
                    className="form-radio text-[#FF4D00]" 
                    />
                    <label htmlFor="dyslexicFontFalse" className="ml-2">On</label>
                </div>
                </div>
                <div className="mt-4">
                <button 
                    type="submit" 
                    className="px-6 py-2 bg-[#FF4D00] text-white rounded-lg shadow hover:bg-[#FF5722] focus:outline-none focus:ring-2 focus:ring-[#FF4D00] focus:ring-opacity-50"
                >
                    Submit
                </button>
                </div>
            </fieldset>
        </form>
        </main>
      </div>
    </div>
  );
}
