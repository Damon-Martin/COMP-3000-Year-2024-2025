"use client"

import HeaderBar from '@/components/regular-components/all-pages/header-bar/header-bar';
import PurchaseButton from '@/components/regular-components/item-page/buttons/purchase-btn';
import DesktopLoggedOutNavBar from '@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop';
import NavBarSwitcher from '@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher';
import Image from 'next/image';

export default function ItemPageDesktop({ id, name, price, description, imageUrl, altImgTxt }) {
    return (
        <div>
            <NavBarSwitcher />
            <main className="flex flex-row items-start justify-center px-12 py-16 gap-16">
                <Image 
                    src={imageUrl} 
                    alt={altImgTxt}
                    width={640} 
                    height={360} 
                    className="rounded-2xl shadow-xl object-cover"
                />
                <div className="max-w-md space-y-4">
                    <p className="text-4xl font-semibold">{name}</p>
                    <p className="text-xl font-medium">£{price}</p>
                    <p className="text-base">{description}</p>
                    
                    <div className="flex flex-col space-y-2 w-full">
                        <PurchaseButton 
                            text="Buy Now" 
                            bgColor="#FF4D00" 
                            textColor="white" 
                        />
                        <PurchaseButton 
                            text="Add to Cart" 
                            bgColor="#D9D9D9" 
                            textColor="black" 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}