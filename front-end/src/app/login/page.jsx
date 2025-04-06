import HeaderBar from "@/components/regular-components/all-pages/header-bar/header-bar";
import DesktopNavBar from "@/components/regular-components/nav-bar/logged-in/desktop/nav-desktop";

export default function LoginPage() {
  return (
    <div>
        <HeaderBar/>
        <DesktopNavBar/>
        <main className="flex flex-row">
            <h1>Login</h1>
        </main>
    </div>
  );
}
