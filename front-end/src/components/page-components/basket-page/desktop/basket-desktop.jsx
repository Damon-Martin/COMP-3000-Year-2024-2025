"use client"

import SupportButton from "@/components/regular-components/all-pages/support-btn/support-btn";
import BasketItemDesktop from "@/components/regular-components/basket-page/item-div/desktop/basket-item"
import PurchaseButton from "@/components/regular-components/item-page/buttons/purchase-btn"

import { useRouter } from 'next/navigation';

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === 'true';

const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function BasketDesktop({ basketList, setBasket, loginStatus, setLoginStatus, username }) {

    // Calculating the the total price
    const totalPrice = basketList?.length > 0 
        ? basketList.reduce((total, item) => total + item.price, 0).toFixed(2)
        : "0.00"; // If basket is empty, set the price to 0.00

    let listOfBasketListIDs = basketList.map(item => item.id);

    const router = useRouter();
    
    const PurchasePressed = (e) => {
        e.preventDefault();

        if (loginStatus !== 'loggedOut') {

            if (listOfBasketListIDs.length > 0) {
                const createOrder = async () => {
                    // Creating order for single item
                    const res = await fetch(`${BackendURI}/v1/payments/create-order`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ itemIDs: listOfBasketListIDs, username: username }),
                    });

                    if (res.ok) {
                        const data = await res.json();
                        const approvalLink = data.approvalLink;
                        localStorage.setItem('orderID', data.orderID); // Storing Order ID For Capture on Processing Page
                        router.push(approvalLink);
                    } 
                    else if (res.status === 400) {
                        alert('Bad Request: Creating Order');
                        console.error('Creating Order Error on Client');
                    } 
                    else if (res.status === 500) {
                        alert('Something wrong happened');
                        console.error('Creating Order Error on Server');
                    } 
                    else {
                        alert('Something wrong happened');
                        console.error(`Unexpected error: ${res.status}`);
                    }
                };

                createOrder();
            }
            else {
                alert("Empty Basket")
            }
        }
        // Encouraging the user to login
        else {
            router.push("/login");
        }
    }
    
    return (
        <div className="flex justify-center">
            <div className="flex flex-col justify-between m-3 min-h-[70vh] max-h-[70vh] min-w-[60-w] max-w-[60vw]">
            <p className="text-xl mb-1">Total: £{totalPrice}</p>
                <div className="flex flex-col overflow-auto min-h-[64vh] max-h-[64vh] min-w-[60vw] max-w-[60vw]">
                    {basketList && basketList.length > 0 ? (
                            basketList.map((item, index) => (
                                <BasketItemDesktop
                                    key={index}
                                    item={item}
                                    name={item.name}
                                    price={item.price}
                                    imageURL={item.imageUrl}
                                    altTxtImage={item.name}
                                    setBasket={setBasket}
                                    loginStatus={loginStatus}
                                    setLoginStatus={setLoginStatus}
                                />
                            ))
                    ) : (
                        <p>Your basket is empty.</p>
                    )}
                </div>
                <PurchaseButton 
                    text="Buy Now" 
                    bgColor="#FF4D00" 
                    textColor="white" 
                    onClick={PurchasePressed}
                />
            </div>
            <SupportButton />
        </div>
    )
}