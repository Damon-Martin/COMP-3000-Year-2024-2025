"use client";

import { useState, useEffect } from "react";
import HomeDesktop from "@/components/page-components/home-page/desktop/home-desktop";
import HomeMobile from "@/components/page-components/home-page/mobile/home-mobile";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // Determines to render desktop or mobile components
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize(); // Checking the initial screen size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <HomeMobile /> : <HomeDesktop />;
}
