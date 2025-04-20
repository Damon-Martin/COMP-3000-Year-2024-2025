"use client";

import { useState, useEffect } from "react";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";

export default function AccessibilitySettingsPage() {
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [isScreenReaderOn, setIsScreenReaderOn] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const dyslexicSetting = JSON.parse(localStorage.getItem("dyslexic-font")) || false;
    const screenReaderSetting = JSON.parse(localStorage.getItem("screen-reader")) || false;
    setIsDyslexicFont(dyslexicSetting);
    setIsScreenReaderOn(screenReaderSetting);
  }, []);

  // Handling changes with dyslexic font option
  // Saves to localStorage
  const handleFontChange = (event) => {
    const value = event.target.value === "true";
    setIsDyslexicFont(value);
    localStorage.setItem("dyslexic-font", JSON.stringify(value));
    window.location.reload("/"); // Appling settings using a full reload
  };

  // Handling changes with Screen-Reader built-in option
  // Saves to localStorage
  const handleScreenReaderChange = (event) => {
    const value = event.target.value === "true";
    setIsScreenReaderOn(value);
    localStorage.setItem("screen-reader", JSON.stringify(value));
    window.location.reload(); // Appling settings using a full reload
  };

  return (
    <div>
      <NavBarSwitcher />
      <h1 tabIndex={0} className="text-3xl my-8 m-3">Accessibility Settings</h1>

      <main className="flex flex-col space-y-10 items-center min-w-[95vw] max-w-[95vw] px-4 pb-10">
        {/* Dyslexic Font Toggling switch */}
        <form className="w-full max-w-xl">
          <fieldset className="space-y-4">
            <legend className="text-xl font-medium">Enable Dyslexic-Friendly Font?</legend>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="dyslexicFontOff"
                  value={false}
                  name="dyslexicFont"
                  checked={!isDyslexicFont}
                  onChange={handleFontChange}
                  className="form-radio text-[#FF4D00]"
                />
                <label htmlFor="dyslexicFontOff" className="ml-2">Off</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="dyslexicFontOn"
                  value={true}
                  name="dyslexicFont"
                  checked={isDyslexicFont}
                  onChange={handleFontChange}
                  className="form-radio text-[#FF4D00]"
                />
                <label htmlFor="dyslexicFontOn" className="ml-2">On</label>
              </div>
            </div>
          </fieldset>
        </form>

        {/* Screen Reader Toggling switch */}
        <form className="w-full max-w-xl">
          <fieldset className="space-y-4">
            <legend className="text-xl font-medium">Enable Built-in Screen Reader?</legend>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="screenReaderOff"
                  value={false}
                  name="screenReader"
                  checked={!isScreenReaderOn}
                  onChange={handleScreenReaderChange}
                  className="form-radio text-[#FF4D00]"
                />
                <label htmlFor="screenReaderOff" className="ml-2">Off</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="screenReaderOn"
                  value={true}
                  name="screenReader"
                  checked={isScreenReaderOn}
                  onChange={handleScreenReaderChange}
                  className="form-radio text-[#FF4D00]"
                />
                <label htmlFor="screenReaderOn" className="ml-2">On</label>
              </div>
            </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}