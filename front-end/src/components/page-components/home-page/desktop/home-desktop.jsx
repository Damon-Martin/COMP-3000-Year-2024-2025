import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import CategorySideBar from "@/components/regular-components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/regular-components/nav-bar/logged-in/desktop/nav-desktop";
import DesktopLoggedOutNavBar from "@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop";


// Desktop variant: Page is more horizontal
export default function HomeDesktop({ isLoggedIn }) {
    return (
        <div>
            <HeaderBar />
            {isLoggedIn ? <DesktopNavBar /> : <DesktopLoggedOutNavBar />}
            <main className="flex flex-row">
                <div id="Best Selling">
                    <p>Best Selling</p>
                </div>
                <div className="ml-auto">
                    <CategorySideBar />
                </div>
            </main>
        </div>
    );
}