'use client'

import HeaderBar from "@/components/regular-components/allUsers/all-pages/header-bar/header-bar";
import LoginCard from "@/components/regular-components/allUsers/login/login-card-center/login-card";
import DesktopLoggedOutNavBar from "@/components/regular-components/allUsers/nav-bar/logged-out/desktop/nav-desktop";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";

// Desktop variant: Page is more horizontal
export default function LoginDesktop() {
    return (
        <div>
            <NavBarSwitcher />
            <main className="flex flex-row justify-center items-center">
                <LoginCard />
            </main>
        </div>
    );
}
