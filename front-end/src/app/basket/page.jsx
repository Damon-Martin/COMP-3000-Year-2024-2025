"use client"

import BasketDesktop from "@/components/page-components/basket-page/desktop/basket-desktop";
import BasketMobile from "@/components/page-components/basket-page/mobile/basket-mobile";
import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import { useEffect, useState } from "react";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function BasketPage() {
    const [loginStatus, setLoginStatus] = useState("loggedOut");
    const [isMobile, setIsMobile] = useState(false);
    const [basket, setBasket] = useState([]);
    const [username, setUsername] = useState();

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
        const isUserLoggedIn = async () => {
            const token = localStorage.getItem("token");

            try {
                if (token) {
                    const res = await fetch(`${AuthURI}/v1/validateJWT`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token: token }),
                    });

                    const data = await res.json();
                    setUsername(data.email)

                    if (data.admin === "admin") {
                        setLoginStatus("admin");
                    } 
                    else if (res.status === 200) {
                        setLoginStatus("loggedIn");
                    } 
                    else {
                        localStorage.removeItem("token");
                        setLoginStatus("loggedOut");
                    }
                }
            } catch (e) {
                console.error("JWT Checker Fetch Failed: ", e);
            }
        };

        isUserLoggedIn();
    }, []);

    /****************** Fetching Basket  ***************************/

    // Syncs the localStorage basket to the backend
    const syncBasket = async () => {
        const itemsToSync = localStorage.getItem("clientBasket");
        const token = localStorage.getItem("token");

        if (itemsToSync && token) {
            const itemList = JSON.parse(itemsToSync).basket;

            // There are items to sync
            if (itemList.length > 0) {
                const currentItem = itemList.pop();
                let reqBody = { newItem: currentItem, clientItems: itemList };

                const res = await fetch(`${BackendURI}/v1/basket/add-items`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                    body: JSON.stringify(reqBody),
                });

                if (res.ok) {
                    localStorage.removeItem("clientBasket");
                    alert("Offline Basket Synced");
                } else {
                    alert("Failed to sync offline basket");
                }
            }
        }
    };

    // Fetches Basket from the server
    const fetchItems = async () => {
        const token = localStorage.getItem("token");

        const rawRes = await fetch(`${BackendURI}/v1/basket/get-basket`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (rawRes.status !== 200) {
            alert("Failed to fetch basket");
        } 
        else {
            const data = await rawRes.json();
            const basket = data.basket;
            setBasket(basket);
        }
    };

    useEffect(() => {
        const getBasketData = async () => {
            if (loginStatus !== "loggedOut") {
                await syncBasket(); // Wait for syncBasket to complete before fetching basket
                fetchItems(); // Fetch basket after syncing
            } else {
                const rawItemList = localStorage.getItem("clientBasket");

                if (!rawItemList) {
                    setBasket([]);
                } else {
                    const parsedBasket = JSON.parse(rawItemList).basket;
                    setBasket(parsedBasket);
                }
            }
        };

        getBasketData();
    }, [loginStatus]);

    return (
        <div>
            <NavBarSwitcher />
            {isMobile ? (
                <BasketMobile basketList={basket} setBasket={setBasket} loginStatus={loginStatus} setLoginStatus={setLoginStatus} username={username} />
            ) : (
                <BasketDesktop basketList={basket} setBasket={setBasket} loginStatus={loginStatus} setLoginStatus={setLoginStatus} username={username} />
            )}
        </div>
    );
}
