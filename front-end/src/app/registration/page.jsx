'use client'

import { useEffect, useState } from "react";
import { redirect } from 'next/navigation'
import LoginDesktop from "@/components/page-components/login-page/desktop/login-desktop";

export default function RegistrationPage() {
    const [isMobile, setIsMobile] = useState(false);
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

    if (loginStatus != "loggedOut") {
        redirect("/");
    }

    // Determines to render desktop or mobile components
    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 600);
        };

        handleResize(); // Checking the initial screen size
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 2 Variants of Registration Page for mobile and dekstop
    if (isMobile) {
        <p>Mobile reg page</p>
    }
    return (
        <p>Desktop reg page</p>
    );
}
