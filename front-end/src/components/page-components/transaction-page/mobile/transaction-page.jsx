import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function TransactionPageMobile({ transactionID }) {
    const [transactionData, setTransactionData] = useState();

    const router = useRouter();

    // Fetching Data of the current transaction with the token which gives access to the data
    useEffect(() => {
        const fetchTransaction = async () => {
            try{
                const token = localStorage.getItem("token")
                const rawRes = await fetch(`${BackendURI}/v1/order-history/get-transaction?transactionID=${transactionID}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                })
                const data = await rawRes.json();
                setTransactionData(data);
    
                if (!rawRes.ok) {
                    router.push("/");
                }
                console.log(data)
            }
            catch {
                router.push("/");
            }
        }
        fetchTransaction();
    }, [])


    const refundBtnPressed = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const rawRefundRes = await fetch(`${BackendURI}/v1/payments/refund-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ transactionID: transactionID})
            })

            if (rawRefundRes.ok) {

                const rawRefundRes2 = await fetch(`${BackendURI}/v1/order-history/set-transaction-refunded`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ transactionID: transactionID})
                })

                if (!rawRefundRes2.ok) {
                    alert("Money Refunded but website does not show it")
                }

                // Refresh Page (SUCCESS)
                // Full Reload to force everything to rerender
                window.location.reload();
            }
            // Failed to refund
            else {
                alert("Refund Failed")
            }
        }
        catch(e) {
            alert("Refund Failed")
            console.error(e)
        }
    }

    // Rendering the data to the dispay
    return (
        <div className="min-h-screen">
            <NavBarSwitcher />
            <main className="flex justify-center items-start mt-10 px-4 text-black">
                <div className="bg-[#d9d9d9] p-6 rounded-2xl shadow-md w-[96vw] max-w-2xl">
                    {transactionData?.order ? (
                        <div>
                            <div className="flex flex-row justify-between">
                                <h1 className="text-xl font-bold mb-2">Order #{transactionID}</h1>
                                {/* Only Rendering button if it is not refunded */}
                                {!transactionData.order.isRefunded && (
                                    <button
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                                        aria-label="Button to Refund Order"
                                        onClick={refundBtnPressed}
                                    >
                                        Refund
                                    </button>
                                )}
                            </div>
                            <p className="text-md mb-4">Total: £{transactionData.order.totalAmount?.value}</p>

                            {/* Dynamically Rendering multiple Items nested in the data */}
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Items:</h2>
                                <ul className="list-disc pl-6">
                                    {transactionData.order.items.map((item, index) => (
                                        <li key={index} className="mb-3">
                                            <p><strong>{item.name}</strong></p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: £{item.unit_amount?.value}</p>
                                            {item.description && <p>Description: {item.description}</p>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
    
                            {/* User Data: to know if the order is refunded */}
                            <div className="mt-6">
                                <p>Refunded: {transactionData.order.isRefunded ? "Yes" : "No"}</p>
                                <p>Customer Email: {transactionData.order.email}</p>
                                <p>Payer Email: {transactionData.order.payerEmail}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center">Loading transaction details...</p>
                    )}
                </div>
            </main>
        </div>
    );
}