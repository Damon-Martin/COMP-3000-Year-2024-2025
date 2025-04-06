import Link from 'next/link'
import NavBtn from '../../buttons/nav-btn';

export default function DesktopNavBar() {
    // Desktop Varient
    return (
        <div className="bg-[#D9D9D9] text-black h-[5dvh] w-full flex items-center justify-between">
            {/* Right-aligned Links */}
            <div className="ml-auto flex items-center">
                <Link href="/" className="mr-3 hover:text-[#FF4D00]">Home</Link>
                <Link href="/account" className="mr-3 hover:text-[#FF4D00]">Account</Link>
                <Link href="/settings" className="mr-3 hover:text-[#FF4D00]">Settings</Link>
                <Link href="/" className="mr-3 hover:text-[#FF4D00]">Basket</Link>
            </div>
        </div>
    );
  }