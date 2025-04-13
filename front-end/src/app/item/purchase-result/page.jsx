"use client"

import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import { useState, useEffect } from "react"

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === 'true';
const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;


// Redirects to order success page or order failure page
export default function PurchaseResultPage() {
    const [orderID, setOrderID] = useState(null);

    useEffect(() => {
        const rawOrderID = localStorage.getItem("orderID");

        if (rawOrderID) {
            setOrderID(rawOrderID);
        } else {
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
                    alert("Order captured successfully!");
                } else {
                    alert("Bad OrderID");
                }
            } 
            catch (e) {
                alert("Paypal Failure");
                console.error(e);
            }
        };

        if (rawOrderID) {
            captureOrder();
        }

        localStorage.removeItem("orderID");
    }, []);

    return (
        <div>
            <NavBarSwitcher />
            <p>Loading...</p>
        </div>
    )
}