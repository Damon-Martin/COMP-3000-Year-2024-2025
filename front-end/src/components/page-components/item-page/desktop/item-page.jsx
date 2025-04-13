"use client"

import HeaderBar from '@/components/regular-components/all-pages/header-bar/header-bar';
import PurchaseButton from '@/components/regular-components/item-page/buttons/purchase-btn';
import DesktopLoggedOutNavBar from '@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop';
import NavBarSwitcher from '@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher';
import Image from 'next/image';
import useRouter from 'next/navigation'

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === 'true';
const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function ItemPageDesktop({ id, name, price, description, imageUrl, altImgTxt }) {
    const purchasePressed = (e) => {
        e.preventDefault();
        
        const createOrder = async () => {
            // Creating order for single item
            const res = await fetch(`${BackendURI}/v1/payments/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemIDs: [ id ] })
            });

            if (res.ok) {
                const data = await res.json();
                const approvalLink = data.approvalLink;
                localStorage.setItem("orderID", data.orderID); // Storing Order ID For Capture on Processing Page
                window.location.href = approvalLink;
            } 
            else if (res.status === 400) {
                alert('Bad Request: Creating Order');
                console.error("Creating Order Error on Client")
            } 
            else if (res.status === 500) {
                alert('Something wrong happened');
                console.error("Creating Order Error on Server")
            } 
            else {
                alert('Something wrong happened');
                console.error(`Unexpected error: ${res.status}`);
            }

            console.log(data)
        }

        createOrder();
    }
    const addToCartPressed = (e) => {
        e.preventDefault();
        alert("Add to Cart pressed");
    }

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
                            onClick={purchasePressed}
                        />
                        <PurchaseButton 
                            text="Add to Cart" 
                            bgColor="#D9D9D9" 
                            textColor="black" 
                            onClick={addToCartPressed}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}