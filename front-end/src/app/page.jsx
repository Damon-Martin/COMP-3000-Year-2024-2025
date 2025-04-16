"use client";

import { useState, useEffect } from "react";
import HomeDesktop from "@/components/page-components/home-page/desktop/home-desktop";
import HomeMobile from "@/components/page-components/home-page/mobile/home-mobile";


const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);
    const [itemList, setItemList] = useState([]);

    // Determines to render desktop or mobile components
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
        };

        handleResize(); // Checking the initial screen size
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
  
      useEffect(() => {
          const fetchPopularItems = async () => {
              const rawData = await fetch(`${BackendURI}/v1/items/sorted-by-popularity`)
              const data = await rawData.json();
              setItemList(data.items);
          }
          fetchPopularItems();
  }, [BackendURI])

  return isMobile ? <HomeMobile ItemList={itemList}/> : <HomeDesktop ItemList={itemList}/>;
}
