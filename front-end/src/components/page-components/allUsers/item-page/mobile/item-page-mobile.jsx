'use client';

import Image from 'next/image';
import NavBarSwitcher from '@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher';
import PurchaseButton from '@/components/regular-components/allUsers/buttons/purchase-btn';
import SearchBar from '@/components/regular-components/allUsers/search-bar/search-bar';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import SupportButton from '@/components/regular-components/allUsers/all-pages/support-btn/support-btn';

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === 'true';

const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;

const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function ItemPageMobile({ id, name, price, description, imageUrl, altImgTxt }) {
    const [loginStatus, setLoginStatus] = useState('loggedOut');
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        const isUserLoggedIn = async () => {
            const token = localStorage.getItem('token');

            try {
                if (token) {
                    const res = await fetch(`${AuthURI}/v1/validateJWT`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    });

                    const data = await res.json();
                    setUsername(data.email);

                    if (data.admin === 'admin') {
                        setLoginStatus('admin');
                    } 
                    else if (res.status === 200) {
                        setLoginStatus('loggedIn');
                    } 
                    else {
                        localStorage.removeItem('token');
                        setLoginStatus('loggedOut');
                    }
                }
            } 
            catch (e) {
                console.error('JWT Checker Fetch Failed: ', e);
            }
        };

        isUserLoggedIn();
    }, []);

    const purchasePressed = (e) => {
        e.preventDefault();

        if (loginStatus !== 'loggedOut') {
            const createOrder = async () => {
                // Creating order for single item
                const res = await fetch(`${BackendURI}/v1/payments/create-order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemIDs: [id], username }),
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
        // Encouraging the user to login
        else {
            router.push("/login");
        }
    };

    const addToCartPressed = (e) => {
        e.preventDefault();

        const newItem = { id, name, price, description, imageUrl, altImgTxt };

        // LocalStorage if loggedOut
        if (loginStatus == "loggedOut") {
            
            let clientBasket = localStorage.getItem("clientBasket");
            
            if (!clientBasket) {
                clientBasket = { basket: [] };
            }
            else {
                clientBasket = JSON.parse(clientBasket);
            }

            clientBasket.basket.push(newItem);
            localStorage.setItem("clientBasket", JSON.stringify(clientBasket));

            alert('Item Added to Basket');
            console.log(clientBasket);
        }
        // DB if loggedIn
        else {
            // get this item and get items in clientBasket
            const addToBasket = async () => {
                const itemsToSync = localStorage.getItem("clientBasket");
                const token = localStorage.getItem("token");

                let reqBody = { newItem: newItem }

                // If there is items to sync from loggedOut
                if (itemsToSync) {
                    const itemList = JSON.parse(itemsToSync).basket;
                    reqBody = { newItem: newItem, clientItems: itemList }
                }

                // Syncing to the database and adding them to the user's items or making it
                const res = await fetch(`${BackendURI}/v1/basket/add-items`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    body: JSON.stringify(reqBody),
                });

                if (res.ok) {
                    localStorage.removeItem("clientBasket")
                    alert("Item Added to Basket")
                }
                else {
                    alert("Failed to add to Basket")
                }
            }

            addToBasket();
        }
    };
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
                    <h1 className="text-2xl font-bold" tabIndex={0} aria-label={`${name}`}>{name}</h1>
                    <p tabIndex={0} aria-label={`Costs £${price}`} className="text-lg">£{price}</p>
                    <p className="text-sm">{description}</p>

                    <div className="space-y-2 pt-2">
                        <PurchaseButton text="Buy Now" bgColor={"#FF4D00"} textColor="white" onClick={purchasePressed} />
                        <PurchaseButton text="Add to Cart" bgColor={"#D9D9D9"} textColor="black" onClick={addToCartPressed} />
                    </div>
                </div>
            </main>
            <SupportButton />
        </div>
    );
}
