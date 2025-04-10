import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import CategorySideBar from "@/components/regular-components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/regular-components/nav-bar/logged-in/desktop/nav-desktop";
import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";

export default function AccountPage() {
  return (
    <div>
        <NavBarSwitcher />
        <main className="flex flex-row">
            <h1>Accounts</h1>
        </main>
    </div>
  );
}
