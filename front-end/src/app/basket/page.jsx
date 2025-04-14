"use client"

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

    // Determines to render desktop or mobile components
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
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
                    
                    if (data.admin == "admin") {
                        setLoginStatus("admin")
                    }
                    else if (res.status == 200) {
                        setLoginStatus("loggedIn");
                    }
                    else {
                        localStorage.removeItem("token");
                        setLoginStatus("loggedOut");
                    }
                }
            } 
            catch (e) {
                console.error("JWT Checker Fetch Failed: ", e);
            }
        };

        isUserLoggedIn();

    }, []);

    /****************** Fetching Basket  ***************************/
    useEffect(() => {
        // LoggedIn so use db
        if (loginStatus != "loggedOut") {

            const fetchItems = async () => {
                const token = localStorage.getItem("token");

                const rawRes = await fetch(`${BackendURI}/v1/basket/get-basket`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (rawRes.status != 200) {
                    alert("Failed to fetch basket")
                }
                else {
                    const data = await rawRes.json();
                    const basket = data.basket;
                    setBasket(basket);
                    console.log(basket);
                }
            }

            fetchItems();
            console.log("LoggedIn and got to fetch items")
        }
        // LoggedOut: Use localStorage
        else {
            const rawItemList = localStorage.getItem("clientBasket");

            // There is no basket yet and the user is not loggedin
            if (!rawItemList) {
                setBasket([]);
            }
            // Using the basket from the localStorage
            else {
                const parsedBasket = JSON.parse(rawItemList).basket;
                setBasket(parsedBasket);
            }
        }
    }, [loginStatus]);

    return (
        <div>
            <NavBarSwitcher />
        </div>
    )
}
