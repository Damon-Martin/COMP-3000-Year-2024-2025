"use client";

import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function OrderHistoryPageDesktop() {



    return (
        <div>
            <NavBarSwitcher />
            
        </div>
    )
}