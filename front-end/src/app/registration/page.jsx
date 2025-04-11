"use client"

import { useEffect, useState } from "react";
import { redirect } from 'next/navigation'
import RegistrationMobilePage from "@/components/page-components/registration-page/mobile/reg-mobile";
import RegistrationDesktopPage from "@/components/page-components/registration-page/desktop/reg-desktop";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_FRONT_END_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function RegistrationPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [loginStatus, setLoginStatus] = useState("loggedOut");

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

    /* Forces to run on the client side */
    if (loginStatus != "loggedOut") {
        redirect("/");
    }

    // 2 Variants of Registration Page for mobile and dekstop
    if (isMobile) {
        return <RegistrationMobilePage AuthURI={AuthURI}/>
    }
    else {
        return <RegistrationDesktopPage AuthURI={AuthURI}/>
    }
}
