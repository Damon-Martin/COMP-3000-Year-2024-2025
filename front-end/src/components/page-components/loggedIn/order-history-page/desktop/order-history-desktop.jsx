import SupportButton from "@/components/regular-components/allUsers/all-pages/support-btn/support-btn";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import OrderButtonDesktop from "@/components/regular-components/loggedIn/order-history-page/order-button/desktop/order-button";
import { useEffect } from "react";

// We are aware the token is valid
export default function OrderHistoryDesktop({ orderHistory }) {

    if (orderHistory.length != 0){
        return (
            <div>
                <NavBarSwitcher />
                <main className="m-3">
                    <p className="text-3xl" tabIndex={0} aria-label="Title: Order History">Order History</p>
                    {orderHistory.map((order, index) => (
                        <OrderButtonDesktop
                            key={index}
                            transactionID={order.transactionID}
                            totalPrice={order.totalAmount.value}
                        />
                    ))}
                </main>
                <SupportButton />
            </div>
        )
    }
    else {
        return (
            <div>
                <NavBarSwitcher />
                <main className="m-3">
                    <p className="text-3xl" tabIndex={0}>Order History</p>
                    <p tabIndex={0} aria-label="Your Order history is Empty">Your Order history is Empty</p>
                </main>
                <SupportButton />
            </div>
        )
    }
}