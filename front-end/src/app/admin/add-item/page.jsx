"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import AddItemCard from "@/components/regular-components/admin/add-item-card/add-item-card";


// Using env variables
const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function AddItemPage() {
    const [loginStatus, setLoginStatus] = useState("loggedOut");
    const [isMobile, setIsMobile] = useState(false);
    const [email, setEmail] = useState("");
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [fetchError, setFetchError] = useState(null);
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
            router.push("/login");
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

            //  LoggedIn user status should not have access to an admin page
            if (res.status === 200) {
                // is not admin
                if (data.admin !== true) {
                    router.push("/");
                } 
                // user is ok and has correct auth level
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
                router.push("/login");
        }
    };
        isUserLoggedIn();

    }, []);

    // Fetching categories from the backend and passing into AddItemCard for the drop down menu
    useEffect(() => {
    const fetchCategories = async () => {
        try {
            const res = await fetch(`${BackendURI}/v1/items/all-categories`);
            const data = await res.json();

            if (res.ok) {
                setCategoryDetails(data.categories);
            } 
            else {
                throw new Error(data.error || "Failed to load categories");
            }
        } 
        catch (e) {
            console.error("Error fetching categories:", e);
            setFetchError("Could not load categories.");
        } 
        finally {
            setIsLoadingCategories(false);
        }
    };

        fetchCategories();
    }, []);

  // Rendering card component with fetched category data array
  return (
        <div>
            <NavBarSwitcher />
            <h1 className="text-3xl">Add Category</h1>
            <main className="w-full flex justify-center">
                {isLoadingCategories ? (
                    <p className="text-gray-500 mt-4">Loading categories...</p>
                ) : fetchError ? (
                    <p className="text-red-500 mt-4">{fetchError}</p>
                ) : (
                    <AddItemCard CategoryDetails={categoryDetails} />
                )}
            </main>
        </div>
    );
}