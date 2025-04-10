'use client'

import { useState, useEffect } from "react";
import DesktopNavBar from "../logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "../logged-out/desktop/nav-desktop";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_FRONT_END_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function NavBarSwitcher() {
    const [loginStatus, setLoginStatus] = useState("loggedOut");

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
    }, [loginStatus]);

    if (loginStatus == "admin") {
        return <DesktopNavBar />
    }
    else if (loginStatus == "loggedIn") {
        return <DesktopNavBar />
    }
    else {
        return <DesktopLoggedOutNavBar />
    }
}