import HeaderBar from "@/components/all-pages/header-bar/header-bar";
import DesktopNavBar from "@/components/nav-bar/logged-in/desktop/nav-desktop";

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
