import HeaderBar from '@/components/regular-components/all-pages/header-bar/header-bar';
import PurchaseButton from '@/components/regular-components/item-page/buttons/purchase-btn';
import DesktopLoggedOutNavBar from '@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop';
import NavBarSwitcher from '@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher';
import Image from 'next/image';

export default function ItemPageDesktop({ name, price, description, imageUrl, altImgTxt }) {
    return (
        <div>
            <NavBarSwitcher />
            <main className="flex flex-row items-center justify-start p-6 gap-10">
                <Image 
                    src={imageUrl} 
                    alt={altImgTxt}
                    width={640} 
                    height={360} 
                    className="rounded-lg shadow-lg"
                />
                <div className="min-w-[400px] max-w-[600px]"> {/* Added min-width and adjusted max-width */}
                    <p className="text-2xl font-bold">{name}</p>
                    <p className="mt-1">£{price}</p>
                    <p className="mt-1">{description}</p>
                    <PurchaseButton text={"Buy Now"} bgColor={"#FF4D00"} color={"white"} width={"full"} height={40} />
                    <PurchaseButton text={"Add to Cart"} bgColor={"#D9D9D9"} color={"black"} width={"full"} height={40} />
                </div>
            </main>
        </div>
    );
}
