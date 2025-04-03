"use client"

import HeaderBar from "@/components/all-pages/header-bar/header-bar";
import DesktopNavBar from "@/components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/nav-bar/logged-out/desktop/nav-desktop";
import SettingButton from "@/components/settings/setting-btn/setting-btn";

import { useState, useEffect } from "react";

export default function SettingsPage() {
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
        <h1 tabIndex={0} className="text-3xl">Settings</h1>
        <main className="flex flex-col">
          <SettingButton redirectUrl={"/"} title={"Accessibility Settings"} description={"Eg Dyslexic Font, Larger Text Options..."}/>
        </main>
      </div>
    </div>
  );
}
