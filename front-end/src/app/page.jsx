"use client"

import HomeDesktop from "@/components/page-components/home-page/desktop/home-main-desktop";
import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import CategorySideBar from "@/components/regular-components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/regular-components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";

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
    <HomeDesktop isLoggedIn={isLoggedIn}/>
  );
}
