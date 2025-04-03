import Link from 'next/link'

export default function DesktopNavBar() {
    // Desktop Varient
    return (
        <div className="bg-[#D9D9D9] text-black h-[5dvh] w-full flex items-center justify-between">
            {/* Centered Links (Using Position Absolute to put middle of screen */}
            

            {/* Right-aligned Links */}
            <div className="ml-auto flex items-center">
                <Link href="/account" className="mr-3 hover:text-[#FF4D00]">Account</Link>
                <Link href="/settings" className="mr-3 hover:text-[#FF4D00]">Settings</Link>
                <Link href="/" className="mr-3 hover:text-[#FF4D00]">Basket</Link>
            </div>
        </div>
    );
  }