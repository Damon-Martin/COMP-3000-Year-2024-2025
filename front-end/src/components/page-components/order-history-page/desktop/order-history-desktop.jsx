import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import { useEffect } from "react";

// We are aware the token is valid
export default function OrderHistoryDesktop() {

    return (
        <div>
            <NavBarSwitcher />
            <main className="m-3">
                <p className="text-3xl">Order History</p>
            </main>
        </div>
    )
}