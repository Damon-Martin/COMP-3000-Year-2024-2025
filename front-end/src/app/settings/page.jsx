import HeaderBar from "@/components/all-pages/header-bar/header-bar";
import DesktopNavBar from "@/components/nav-bar/logged-in/desktop/nav-desktop";

export default function SettingsPage() {
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
