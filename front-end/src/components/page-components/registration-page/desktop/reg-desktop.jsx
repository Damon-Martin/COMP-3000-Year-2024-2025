"use client"

import SupportButton from "@/components/regular-components/all-pages/support-btn/support-btn";
import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import RegistrationCard from "@/components/regular-components/registration/registration-card/registration-card";

// Desktop variant: Page is more horizontal
export default function RegistrationDesktopPage({ AuthURI }) {
    return (
        <div>
            <NavBarSwitcher />
            <main className="flex flex-row justify-center items-center">
                <RegistrationCard width={"60vw"} height={"66vh"} margin={"40px"} AuthURI={AuthURI}/>
            </main>
            <SupportButton />
        </div>
    );
}
