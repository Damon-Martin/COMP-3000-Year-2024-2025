"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import AddCategoryCard from "@/components/regular-components/admin/add-category-card/add-category-card";


const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
  ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
  : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function AddCategoriesPage() {
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

                //  LoggedIn
                if (res.status === 200) {
                    // is not admin
                    if (data.admin !== true) {
                        router.push("/");
                    } 
                    else {
                        setLoginStatus("admin");
                    }
                } 
                else {
                    localStorage.removeItem("token");
                    router.push("/login");
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


    return (
        <div>
            <NavBarSwitcher />
            <h1 className="text-3xl">Add Category</h1>
            <main className="w-full flex justify-center">
                <AddCategoryCard />
            </main>
        </div>
    )
}