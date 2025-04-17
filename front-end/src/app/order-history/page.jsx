"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import OrderHistoryDesktop from "@/components/page-components/order-history-page/desktop/order-history-desktop"; 


const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;
const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function OrderHistoryPage() {
    const [loginStatus, setLoginStatus] = useState("loggedOut");
    const [isMobile, setIsMobile] = useState(false);
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

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const token = localStorage.getItem("token");
            const rawRes = await fetch(`${BackendURI}/v1/order-history/get-all-orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await rawRes.json();
            console.log(data.orderHistory);
        }
        if (loginStatus == "loggedIn") {
            fetchOrderHistory();
        }
    }, [loginStatus])


    // Logic for mobile variant
    if (isMobile == false) {
        return <OrderHistoryDesktop />
    }
    else {
        return <OrderHistoryDesktop />
    }
}