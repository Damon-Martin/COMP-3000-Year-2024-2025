"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import AddCategoryCard from "@/components/regular-components/admin/add-category-card/add-category-card";
import AddItemCard from "@/components/regular-components/admin/add-item-card/add-item-card";


const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
  ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
  : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function AddItemPage() {
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

    const testData = [
        {
          "_id": "67f9cda665cc443c20c9a761",
          "categoryName": "Clothing",
          "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Ego_Unisex_Fashions%2C_1981_Hall%2C_Kirkgate_Market%2C_Leeds_%2822nd_September_2012%29.JPG/1600px-Ego_Unisex_Fashions%2C_1981_Hall%2C_Kirkgate_Market%2C_Leeds_%2822nd_September_2012%29.JPG?2012123013263",
          "altImgTxt": "Image of Clothing"
        },
        {
          "_id": "67f9dd4f713c94334e2c3b04",
          "categoryName": "Kitchen Appliances",
          "imageURL": "https://live.staticflickr.com/7012/6736237505_27f2b796a5_b.jpg",
          "altImgTxt": "Image of a Kitchen Appliances"
        },
        {
          "_id": "67f9de9c713c94334e2c3b07",
          "categoryName": "Furniture",
          "imageURL": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Kubus_sofa.jpg",
          "altImgTxt": "Image of Furniture"
        },
        {
          "_id": "67f9df26713c94334e2c3b0a",
          "categoryName": "Toys",
          "imageURL": "https://upload.wikimedia.org/wikipedia/commons/7/71/Modern_Toys%2C_Japan_1958-001.jpg",
          "altImgTxt": "Image of Toys"
        }
    ];

    return (
        <div>
            <NavBarSwitcher />
            <h1 className="text-3xl">Add Category</h1>
            <main className="w-full flex justify-center">
                <AddItemCard CategoryDetails={testData} />
            </main>
        </div>
    )
}