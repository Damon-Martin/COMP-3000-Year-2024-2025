"use client"

import SupportButton from "@/components/regular-components/allUsers/all-pages/support-btn/support-btn";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import RegistrationCard from "@/components/regular-components/allUsers/registration/registration-card/registration-card";

// Desktop variant: Page is more horizontal
export default function RegistrationMobilePage({ AuthURI }) {
    return (
        <div>
            <NavBarSwitcher />
            <main className="flex flex-row justify-center items-center">
                <RegistrationCard width="90vw" AuthURI={AuthURI}/>
            </main>
            <SupportButton />
        </div>
    );
}
