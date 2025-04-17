"use client"

import AccountsButtonDesktopLarge from "@/components/regular-components/loggedIn/accounts-page/accounts-page-button-large";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";

import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

export default function AccountsPageDesktop() {
    const router = useRouter();
    const logoutPressed = () => {
        localStorage.removeItem("token");
        router.push("/");
    }
    return (
        <div>
            <NavBarSwitcher />
            <div className="flex flex-col m-3">
                <div className="flex flex-row justify-between">
                    <p tabIndex={0} className="text-3xl" aria-label="Accounts Page">Accounts</p>
                    <div>
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                            aria-label="Button to Delete Account"
                        >
                            Delete Account
                        </button>
                        <button
                            className="ml-3 bg-[#D9D9D9] text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Button to Logout"
                            onClick={logoutPressed}
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    {/* Edit Details Button (LINK) */}
                    <AccountsButtonDesktopLarge src="/" title="Edit Details" ariaLabel={"Link to Edit Account Details Page"} imgUrl="/images/user-details-icon/user-details-icon.svg" />
                    {/* Order History Button (LINK) */}
                    <AccountsButtonDesktopLarge src="/order-history" title="Order History" ariaLabel={"Link to view Order History"} imgUrl="/images/history-icon/history-icon.svg" />
                </div>
            </div>
        </div>
    )
}