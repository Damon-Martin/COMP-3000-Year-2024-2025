import HeaderBar from "@/components/all-pages/header-bar/header-bar";
import DesktopNavBar from "@/components/nav-bar/logged-in/desktop/nav-desktop";

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
      <main className="flex flex-row">
        <h1>Settings</h1>
      </main>
    </div>
  );
}
