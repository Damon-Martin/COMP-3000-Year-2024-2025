import AccountsButtonDesktopLarge from "@/components/regular-components/accounts-page/accounts-page-button-large";
import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";

export default function AccountsPageDesktop() {
    return (
        <div>
            <NavBarSwitcher />
            <div className="flex flex-col m-3">
                <div className="flex flex-row justify-between">
                    <p tabIndex={0} className="text-3xl" aria-label="Accounts Page">Accounts</p>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                        aria-label="Button to Delete Account"
                    >
                        Delete Account
                    </button>
                </div>
                <div className="flex flex-col">
                    {/* Edit Details Button (LINK) */}
                    <AccountsButtonDesktopLarge src="/" title="Edit Details" ariaLabel={"Link to Edit Account Details Page"} imgUrl="/images/history-icon/history-icon.svg" />
                    {/* Order History Button (LINK) */}
                    <AccountsButtonDesktopLarge src="/" title="Order History" ariaLabel={"Link to view Order History"} imgUrl="/images/user-details-icon/user-details-icon.svg" />
                </div>
            </div>
        </div>
    )
}