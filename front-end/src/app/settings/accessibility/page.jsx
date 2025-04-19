"use client"

import HeaderBar from "@/components/regular-components/allUsers/all-pages/header-bar/header-bar";
import DesktopNavBar from "@/components/regular-components/allUsers/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/regular-components/allUsers/nav-bar/logged-out/desktop/nav-desktop";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import SettingButton from "@/components/regular-components/allUsers/settings/setting-btn/setting-btn";

import { useState, useEffect } from "react";

export default function AccessibilitySettingsPage() {
  const [textSize, setTextSize] = useState(16);

  return (
    <div>
      <NavBarSwitcher />
      <h1 tabIndex={0} className="text-3xl">Accessibility</h1>
      <main className="flex flex-col space-y-8 items-center min-w-[95vw] max-w-[95vw]">
        {/* Dyslexic Font Switcher */}
        <form>
          <fieldset className="space-y-4">
            <legend className="text-xl font-medium">Would you like to enable a dyslexic friendly font?</legend>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="dyslexicFontTrue" 
                  value={true} 
                  name="dyslexicFont"
                  className="form-radio text-[#FF4D00]" 
                />
                <label htmlFor="dyslexicFontTrue" className="ml-2">Off</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="dyslexicFontFalse" 
                  value={false} 
                  name="dyslexicFont"
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
  );
}
