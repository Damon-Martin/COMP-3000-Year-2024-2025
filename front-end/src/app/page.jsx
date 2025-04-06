"use client";

import { useState, useEffect } from "react";
import HomeDesktop from "@/components/page-components/home-page/desktop/home-main-desktop";
import HomeMobile from "@/components/page-components/home-page/mobile/home-main-mobile";

export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // On Mount: Check if Logged In
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  // Determines to render desktop or mobile components
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize(); // Checking the initial screen size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <HomeMobile /> : <HomeDesktop isLoggedIn={isLoggedIn} />;
}
