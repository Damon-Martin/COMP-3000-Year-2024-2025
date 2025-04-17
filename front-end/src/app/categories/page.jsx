"use client"

import CategoriesPageDesktop from "@/components/page-components/categories-page/desktop/category-page";
import CategoriesPageMobile from "@/components/page-components/categories-page/mobile/category-page";
import { useEffect, useState } from "react";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function CategoriesPage() {
    const [categoriesList, setCategoriesList] = useState([])
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const rawRes = await fetch(`${BackendURI}/v1/items/all-categories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await rawRes.json();

                if (!rawRes.ok) {
                    alert("Failed retrieving categories")
                    console.error(data.error)
                }
                else {
                    setCategoriesList(data.categories);
                    console.log(data.categories);
                }
            }
            catch (e) {
                alert("Failed retriving categories")
                console.error(e)
            }
        }
        fetchCategories();
    }, [])

    // Determines to render desktop or mobile components
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
        };

        handleResize(); // Checking the initial screen size
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    

    if (isMobile){
        return (
            <CategoriesPageMobile />
        )
    }
    else {
        return (
            <CategoriesPageDesktop categoriesList={categoriesList}/>
        )
    }
    
}