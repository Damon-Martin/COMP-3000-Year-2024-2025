import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";
import RegistrationCard from "@/components/regular-components/registration/registration-card/registration-card";

// Desktop variant: Page is more horizontal
export default function RegistrationDesktopPage() {
    return (
        <div>
            <NavBarSwitcher />
            <main className="flex flex-row justify-center items-center">
                <RegistrationCard width={"30vw"} height={"30vh"} />
            </main>
        </div>
    );
}
