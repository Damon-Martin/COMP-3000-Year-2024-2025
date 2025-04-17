"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import TransactionPageDesktop from "@/components/page-components/transaction-page/desktop/transaction-page";
import TransactionPageMobile from "@/components/page-components/transaction-page/mobile/transaction-page";


const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;
const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function TransactionPage({ searchParams }) {
    const [loginStatus, setLoginStatus] = useState("loggedOut");
    const [isMobile, setIsMobile] = useState(false);
    const [transactionID, setTransactionID] = useState(searchParams.transactionID || "");
    const [orderHistory, setOrderHistory] = useState([]);
    
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
                    setLoginStatus("admin")
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


        // This page needs a transaction ID to load
        if (!transactionID) {
            router.push("/")
        }

    }, []);

    if (loginStatus == "loggedIn" || loginStatus=="admin") {
        if (!isMobile){
            return (
                <TransactionPageDesktop transactionID={transactionID}/>
            )
        }
        else {
            return(
                <TransactionPageMobile transactionID={transactionID} />
            )
        }

    }
    else {
        <p>Unauthorized Access</p>
    }
}