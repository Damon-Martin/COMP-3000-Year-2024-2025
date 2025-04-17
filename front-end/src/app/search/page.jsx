'use client';

import { useState, useEffect } from "react";

import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import SearchBar from "@/components/regular-components/allUsers/search-bar/search-bar";
import SearchResultButtonDesktop from "@/components/regular-components/allUsers/result-button.jsx/desktop/search-result-button";
import SearchResultButtonMobile from "@/components/regular-components/allUsers/result-button.jsx/mobile/search-result-button";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function SearchPage({ searchParams }) {
    const [query, setQuery] = useState(searchParams.query || "");
    const [itemList, setItemList] = useState([]); // Stores Fetched item list
    const [isMobile, setIsMobile] = useState(false);

    // Determines to render desktop or mobile components
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
        };

        handleResize(); // Checking the initial screen size
        window.addEventListener("resize", handleResize); // Handling a change to width

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setQuery(searchParams.query || "");
    }, [searchParams.query]);

    useEffect(() => {
        const fetchQuery = async () => {
            if (!query) return;

            try {
                const res = await fetch(`${BackendURI}/v1/items/search?query=${query}`);

                const data = await res.json();
                setItemList(data.items);
                console.log(data.items);
            } 
            catch (e) {
                console.error("Error fetching data:", e);
            }
        };

        fetchQuery();
    }, [query, BackendURI]);

    if (isMobile) {
        return (
            <div>
                <NavBarSwitcher />
                <SearchBar />
                <main className="flex flex-col items-center justify-center overflow-auto max-h-[76vh]">
                {itemList.map(currentItem => (
                    <SearchResultButtonMobile
                        item={currentItem}
                        name={currentItem.name}
                        price={currentItem.price}
                        imageURL={currentItem.imageUrl}
                        altTxtImage={currentItem.altImgTxt}
                    />
                ))}
                </main>
            </div>
        );
    }
    else {
        return (
            <div>
                <NavBarSwitcher />
                <main className="flex flex-col items-center justify-center overflow-auto max-h-[76vh]">
                {itemList.map(currentItem => (
                    <SearchResultButtonDesktop
                        item={currentItem}
                        name={currentItem.name}
                        price={currentItem.price}
                        imageURL={currentItem.imageUrl}
                        altTxtImage={currentItem.altImgTxt}
                    />
                ))}
                </main>
            </div>
        );
    }
}
    
