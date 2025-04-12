"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ItemCardDesktop({ item, name = "Item Name", price = "XX.XX", imageURL, altTxtImage }) {
    const router = useRouter();

    const btnPressed = (e) => {
        e.preventDefault();
        router.push(`/item/${item._id}`);
    };

    return (
        <button 
            onClick={btnPressed} 
            type="button" 
            key={item._id} 
            className="flex flex-col items-center bg-[#D9D9D9] hover:bg-gray-100 text-black rounded-lg shadow-md min-w-[15.4vw] max-w-[15.4vw] h-[25vh] max-h-[25vh]"
        >
            <div className="w-full h-3/4 flex justify-center items-center overflow-hidden rounded-md">
                <Image
                    src={imageURL}
                    placeholder="blur"
                    alt={altTxtImage}
                    className="rounded-md object-cover w-full h-full"
                />
            </div>
            <div className="w-full h-1/4 flex flex-col justify-center items-center mt-2">
                <p className="text-sm font-medium text-center">{name}</p>
                <p className="text-md font-semibold">£{price}</p>
            </div>
        </button>
    );
}