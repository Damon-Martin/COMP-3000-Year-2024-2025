'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SingleCategoryDesktop from '@/components/page-components/single-category-page/desktop/single-category-desktop';

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === 'true';
const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function CategoryPage() {
    const params = useParams();
    const categoryID = params.categoryID;
    const [isMobile, setIsMobile] = useState(false);
    const [categoryData, setCategoriesData] = useState(null);
    const [error, setError] = useState(null);

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
        if (!categoryID) {
            router.push("/categories")
        }

        const fetchCategoryData = async () => {
            const rawRes = await fetch(`${BackendURI}/v1/items/all-items-by-categoryID?categoryID=${categoryID}`, {
                method: "GET"
            })
            
            if (!rawRes.ok) {
                alert("Category does not exist")
                router.push("/categories")
            }
            else {
                const data = await rawRes.json();
                console.log(data.items);
                setCategoriesData(data.items);
            }
        }

        fetchCategoryData();
    }, [categoryID])
    
    return (
        <SingleCategoryDesktop categoryData={categoryData}/>
    )
}