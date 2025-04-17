"use client"

import { useEffect, useState } from "react";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function CategoriesPage() {
    const [categoriesList, setCategoriesList] = useState([])
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

    return (
        <div>
            Categories Page
        </div>
    )
}