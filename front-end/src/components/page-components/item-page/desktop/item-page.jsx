import HeaderBar from '@/components/regular-components/all-pages/header-bar/header-bar';
import DesktopLoggedOutNavBar from '@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop';
import Image from 'next/image';

export default function ItemPageDesktop({ ItemID }) {
    return (
        <div>
            <HeaderBar />
            <DesktopLoggedOutNavBar />
            <main className="flex flex-row items-center justify-start p-6 gap-10">
                <Image 
                    src="https://live.staticflickr.com/65535/49174901528_6c8cfa013f_b.jpg" 
                    alt="Item Image" 
                    width={640} 
                    height={360} 
                    className="rounded-lg shadow-lg"
                />
                <div className="max-w-md">
                    <p className="text-2xl font-semibold">Item Name</p>
                    <p className="mt-2">Item Description</p>
                </div>
            </main>
        </div>
    );
}
