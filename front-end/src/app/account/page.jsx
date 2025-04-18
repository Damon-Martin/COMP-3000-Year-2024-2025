"use client";

import AccountsPageDesktop from "@/components/page-components/loggedIn/accounts-page/accounts-page";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
  ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
  : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function AccountPage() {
    const [loginStatus, setLoginStatus] = useState("loggedOut");
    const [isMobile, setIsMobile] = useState(false);
    const [email, setEmail] = useState("");
    const router = useRouter();

    // Handling Mobile and Desktop Variants
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Checking login status
    useEffect(() => {
        const isUserLoggedIn = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                router.push("/login")
            }

            try {
                const res = await fetch(`${AuthURI}/v1/validateJWT`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await res.json();
                setEmail(data.email);

                // Account page for admins out of scope for now
                if (data.admin === "admin") {
                    router.push("/")
                } 
                else if (res.status === 200) {
                    setLoginStatus("loggedIn");
                } 
                // Token Expired
                else {
                    localStorage.removeItem("token");
                    router.push("/login")
                }
            } 
            catch (e) {
                console.error("JWT validation failed:", e);
                localStorage.removeItem("token");
                router.push("/login")
            }
        };

        isUserLoggedIn();
    }, []);


    return <AccountsPageDesktop email={email}/>;
}