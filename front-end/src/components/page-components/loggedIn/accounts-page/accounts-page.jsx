"use client"

import AccountsButtonDesktopLarge from "@/components/regular-components/loggedIn/accounts-page/accounts-page-button-large";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";

import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import SupportButton from "@/components/regular-components/allUsers/all-pages/support-btn/support-btn";


const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function AccountsPageDesktop({ email }) {
    const router = useRouter();

    const deleteAccountPressed = async () => {
        try {
            const token = localStorage.getItem("token");
            const rawRes = await fetch(`${BackendURI}/v1/user-details?email=${email}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = await rawRes.json();

            if (!rawRes.ok) {
                alert("Failed to delete account")
                console.error(data.error);
            }
            else {
                // After deletion logout on browser
                logoutPressed();
            }
        }
        catch (e) {
            alert("Failed to delete Account");
            console.error(e);
        }
    }

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
                            onClick={deleteAccountPressed}
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
            <SupportButton />
        </div>
    )
}