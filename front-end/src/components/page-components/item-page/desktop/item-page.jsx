'use client';

import PurchaseButton from '@/components/regular-components/item-page/buttons/purchase-btn';
import NavBarSwitcher from '@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === 'true';

const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;

const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function ItemPageDesktop({ id, name, price, description, imageUrl, altImgTxt }) {
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
                    } else if (res.status === 200) {
                        setLoginStatus('loggedIn');
                    } else {
                        localStorage.removeItem('token');
                        setLoginStatus('loggedOut');
                    }
                }
            } catch (e) {
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
                    body: JSON.stringify({ itemIDs: [id], username: username }),
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