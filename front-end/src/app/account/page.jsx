"use client"

import AccountsPageDesktop from "@/components/page-components/accounts-page/accounts-page";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function AccountPage() {
    const [loginStatus, setLoginStatus] = useState("loggedOut");
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

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

                // Out of scope for now so redirect
                if (data.admin === "admin") {
                    setLoginStatus("admin");
                } 
                // User is LoggedIn: Thus should have access
                else if (res.status === 200) {
                    setLoginStatus("loggedIn");
                } 
                // User is LoggedOut
                else {
                    localStorage.removeItem("token");
                    setLoginStatus("loggedOut");
                }
            }

            if (loginStatus == "loggedOut") {
                router.push("/login")
            }
            if (loginStatus == "admin") {
                router.push("/")
            }

        } 
        catch (e) {
            console.error("JWT Checker Fetch Failed: ", e);
        }
        }
    isUserLoggedIn();
    }, []);

    // User is logged In
    return (
      <AccountsPageDesktop />
    );
}