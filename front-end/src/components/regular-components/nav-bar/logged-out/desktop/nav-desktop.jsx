import Link from 'next/link'
import NavBtn from '../../buttons/nav-btn';

export default function DesktopLoggedOutNavBar() {
    // Desktop Varient
    return (
        <div className="bg-[#D9D9D9] text-black h-[5dvh] w-full flex items-center justify-between">
            {/* Right-aligned Links */}
            <div className="ml-auto flex items-center">
                <Link href="/login" className="mr-3 hover:text-[#FF4D00]">Login</Link>
                <NavBtn size={24} redirectURL="/" altTxt="Home Page" svgLocation="/images/shop-icon/shop-icon.svg" activeSvgLocation="/images/shop-icon/shop-icon-active.svg"  />
                <Link href="/settings" className="mr-3 hover:text-[#FF4D00]">Settings</Link>
                <Link href="/" className="mr-3 hover:text-[#FF4D00]">Basket</Link>
            </div>
        </div>
    );
  }