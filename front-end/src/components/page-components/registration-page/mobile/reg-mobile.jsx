'use client'

import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";

// Desktop variant: Page is more horizontal
export default function RegistrationMobilePage() {
    return (
        <div>
            <NavBarSwitcher />
            <main className="flex flex-row justify-center items-center">
                <p>Registration Mobile</p>
            </main>
        </div>
    );
}
