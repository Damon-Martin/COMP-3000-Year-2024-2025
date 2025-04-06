import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";


// Desktop variant: Page is more horizontal
export default function LoginDesktop() {
    return (
        <div>
            <HeaderBar />
            <DesktopLoggedOutNavBar />
            <main className="flex flex-row">
                <h1>Login</h1>
            </main>
        </div>
    );
}