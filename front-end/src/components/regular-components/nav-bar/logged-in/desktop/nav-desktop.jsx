import Link from 'next/link'
import NavBtn from '../../buttons/nav-btn';

export default function DesktopNavBar() {
    // Desktop Varient
    return (
        <div className="bg-[#D9D9D9] text-black h-[5dvh] w-full flex items-center justify-between">
            {/* Right-aligned Links */}
            <div className="ml-auto flex items-center">
                <NavBtn size={24} redirectURL="/" altTxt="Home Page" svgLocation="/images/shop-icon/shop-icon.svg" activeSvgLocation="/images/shop-icon/shop-active.svg"  />
                <NavBtn size={24} redirectURL="/" altTxt="Account Page" svgLocation="/images/account-icon/account-icon.svg" activeSvgLocation="/images/account-icon/account-active.svg" />
                <NavBtn size={24} redirectURL="/settings" altTxt="Settings Page" svgLocation="/images/settings-icon/settings-icon.svg" activeSvgLocation="/images/settings-icon/settings-active.svg"  />
                <NavBtn size={24} redirectURL="/" altTxt="Basket Page" svgLocation="/images/basket-icon/basket-icon.svg" activeSvgLocation="/images/basket-icon/basket-active.svg"  />
            </div>
        </div>
    );
  }