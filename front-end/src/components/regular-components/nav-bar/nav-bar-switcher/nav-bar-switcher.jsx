'use client'

import { useState, useEffect } from "react";
import DesktopNavBar from "../logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "../logged-out/desktop/nav-desktop";
import MobileLoggedOutNavBar from "../logged-out/mobile/nav-mobile";
import MobileLoggedInNavBar from "../logged-in/mobile/nav-mobile";
import MobileAdminNavBar from "../admin/mobile/nav-admin-mobile";
import DesktopAdminNavBar from "../admin/desktop/nav-admin";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function NavBarSwitcher() {
    const [loginStatus, setLoginStatus] = useState("loggedOut");
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

    if (loginStatus === "loggedIn") {
        return isMobile ? <MobileLoggedInNavBar /> : <DesktopNavBar />;
    } 
    else if (loginStatus === "admin" ) {
        return isMobile ? <MobileAdminNavBar /> : <DesktopAdminNavBar />;
    }
    else {
        return isMobile ? <MobileLoggedOutNavBar /> : <DesktopLoggedOutNavBar />;
    }
}