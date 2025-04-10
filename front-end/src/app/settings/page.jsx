"use client"

import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import DesktopNavBar from "@/components/regular-components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";
import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import SettingButton from "@/components/regular-components/settings/setting-btn/setting-btn";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  return (
      <div>
        <NavBarSwitcher />
        <h1 tabIndex={0} className="text-3xl">Settings</h1>
        <main className="flex flex-col">
          <SettingButton redirectUrl={"/settings/accessibility"} title={"Accessibility Settings"} description={"Eg Dyslexic Font, Larger Text Options..."}/>
        </main>
      </div>
  );
}
