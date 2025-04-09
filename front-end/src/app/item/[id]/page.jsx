'use client';

import { useParams, redirect  } from 'next/navigation';
import ItemPageDesktop from "@/components/page-components/item-page/desktop/item-page";

export default function ItemPage() {
    const params = useParams();
    const ItemID = params.id;

    return (
        <ItemPageDesktop ItemID={ItemID} />
    );
}
