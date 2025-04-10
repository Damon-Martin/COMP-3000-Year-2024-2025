'use client'

import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import LoginCard from "@/components/regular-components/login/login-card-center/login-card";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";
import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";

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
