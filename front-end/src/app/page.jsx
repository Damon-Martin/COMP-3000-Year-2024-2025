"use client"

import HeaderBar from "@/components/all-pages/header-bar/header-bar";
import CategorySideBar from "@/components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/nav-bar/logged-out/desktop/nav-desktop";

import { useState, useEffect } from "react";

export default function Home() {
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
        <div id="Best Selling">
          <p>asdfsdafasd</p>
        </div>
        <div className="ml-auto">
          <CategorySideBar />
        </div>
      </main>
    </div>
  );
}
