'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SearchResultButtonMobile({
    item,
    name = "Item Name",
    price = "XX.XX",
    imageURL,
    altTxtImage = "Product image"
}) {
    return (
        <Link
            href={`/item/${item._id}`}
            key={item._id}
            className="bg-[#D9D9D9] hover:bg-gray-100 text-black mt-3 min-h-[42vh] border rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden w-full"
            aria-label={`Link to ${name}`}
        >
            <div className="relative w-full h-60">
                <Image
                    src={imageURL}
                    alt={altTxtImage}
                    fill
                    className="rounded-t-2xl object-cover"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold truncate">{name}</h2>
                <div className="flex justify-between items-center mt-1 mb-1">
                    <span className="font-bold">£{Number(price).toFixed(2)}</span>
                </div>
            </div>
        </Link>
    );
}