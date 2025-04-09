'use client';

import { useParams } from 'next/navigation';
import ItemPageDesktop from "@/components/page-components/item-page/desktop/item-page";
import { useEffect, useState } from 'react';

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === 'true';
const AuthURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_FRONT_END_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI_FRONT_END;

export default function ItemPage() {
    const params = useParams();
    const ItemID = params.id;
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const res = await fetch(`${AuthURI}/v1/items?ItemID=${ItemID}`);
                if (!res.ok) throw new Error("Failed to fetch item");
                const data = await res.json();
                setItem(data.item);
            } 
            catch (e) {
                console.error("Error fetching item:", e);
                setError(e.message);
            }
        };

        if (ItemID) {
            fetchItemData();
        }
    }, [ItemID]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!item) {
        return <p>Loading...</p>;
    }

    return (
        <ItemPageDesktop 
            name={item.name} 
            price={item.price} 
            description={item.description} 
            imageUrl={item.imageUrl} 
            altImgTxt={item.altImgTxt} 
        />
    );
}
