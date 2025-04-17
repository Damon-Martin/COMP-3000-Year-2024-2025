"use client"

import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === 'true';
const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;


// Redirects to order success page or order failure page
export default function PurchaseResultPage() {
    const [orderID, setOrderID] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const rawOrderID = localStorage.getItem("orderID");

        if (rawOrderID) {
            setOrderID(rawOrderID);
        } 
        else {
            console.error("Order ID is missing in localStorage.");
            return;
        }

        const captureOrder = async () => {
            try {
                const rawRes = await fetch(`${BackendURI}/v1/payments/capture-order`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ orderID: rawOrderID })
                });

                if (rawRes.ok) {
                    const data = await rawRes.json();

                    // Deleting Basket
                    const token = localStorage.getItem("token")
                    const rawResBasket = await fetch(`${BackendURI}/v1/basket/clear-basket`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }) 

                    if (!rawResBasket.ok) {
                        alert("Failed to clear basket")
                    }

                    router.push(`/transaction?transactionID=${data.transactionID}`);
                } 
                else {
                    // Redirect to order failure page
                    alert("Bad OrderID");
                    router.push(`/transaction/order-failure`);
                }
                localStorage.removeItem("orderID");
            } 
            catch (e) {
                // Failed completely fetching PayPal
                alert("Paypal Failure");
                console.error(e);
                router.push(`/transaction/order-failure`);
            }
        };

        if (rawOrderID) {
            captureOrder();
        }

    }, []);

    return (
        <div>
            <NavBarSwitcher />
            <p>Loading...</p>
        </div>
    )
}