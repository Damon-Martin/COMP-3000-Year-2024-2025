import HeaderBar from "@/components/all-pages/header-bar/header-bar";
import CategorySideBar from "@/components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/nav-bar/logged-in/desktop/nav-desktop";

export default function AccountPage() {
  return (
    <div>
        <HeaderBar/>
        <DesktopNavBar/>
        <main className="flex flex-row">
            <h1>Settings</h1>
        </main>
    </div>
  );
}
