'use client';

import Image from 'next/image';
import NavBarSwitcher from '@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher';
import PurchaseButton from '@/components/regular-components/item-page/buttons/purchase-btn';
import SearchBar from '@/components/regular-components/search-bar/search-bar';

export default function ItemPageMobile({ id, name, price, description, imageUrl, altImgTxt }) {
    return (
        <div className="min-h-screen">
            <NavBarSwitcher />
            <SearchBar />
            <main className="flex flex-col items-center p-6 gap-8">
                <div className="w-full flex justify-center">
                    <Image 
                        src={imageUrl} 
                        alt={altImgTxt}
                        width={640} 
                        height={150} 
                        className="rounded-lg shadow-md object-cover"
                    />
                </div>

                <div className="w-full max-w-md space-y-4">
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <p className="text-lg">£{price}</p>
                    <p className="text-sm">{description}</p>

                    <div className="space-y-2 pt-2">
                        <PurchaseButton text="Buy Now" bgColor={"#FF4D00"} textColor="white" />
                        <PurchaseButton text="Add to Cart" bgColor={"#D9D9D9"} textColor="black" />
                    </div>
                </div>
            </main>
        </div>
    );
}
