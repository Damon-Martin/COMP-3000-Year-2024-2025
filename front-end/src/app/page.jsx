import HeaderBar from "@/components/all-pages/header-bar/header-bar";
import CategorySideBar from "@/components/home-page/side-bar/category-side-bar";
import DesktopNavBar from "@/components/nav-bar/logged-in/desktop/nav-desktop";

export default function Home() {
  return (
    <div>
        <HeaderBar/>
        <DesktopNavBar/>
        <main className="flex flex-row">
            <div id="Best Selling">
                <p>asdfsdafasd</p>
            </div>
            <div>
                <CategorySideBar/>
            </div>
        </main>
    </div>
  );
}
