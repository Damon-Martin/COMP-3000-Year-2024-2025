"use client"

import HeaderBar from "@/components/regular-components/allUsers/all-pages/header-bar/header-bar";
import DesktopNavBar from "@/components/regular-components/allUsers/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/regular-components/allUsers/nav-bar/logged-out/desktop/nav-desktop";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import SettingButton from "@/components/regular-components/allUsers/settings/setting-btn/setting-btn";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  return (
      <div>
        <NavBarSwitcher />
        <h1 tabIndex={0} className="text-3xl m-3">Settings</h1>
        <main className="flex flex-col items-center min-w-screen max-w-screen">
          <SettingButton redirectUrl={"/settings/accessibility"} title={"Accessibility Settings"} description={"Custom Accessibility Features"}/>
        </main>
      </div>
  );
}
