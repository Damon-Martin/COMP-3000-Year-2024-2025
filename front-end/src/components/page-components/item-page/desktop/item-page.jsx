import HeaderBar from '@/components/regular-components/all-pages/header-bar/header-bar';
import DesktopLoggedOutNavBar from '@/components/regular-components/nav-bar/logged-out/desktop/nav-desktop';
import Image from 'next/image';

export default function ItemPageDesktop({ name, price, description, imageUrl, altImgTxt }) {
    console.log(imageUrl);
    return (
        <div>
            <HeaderBar />
            <DesktopLoggedOutNavBar />
            <main className="flex flex-row items-center justify-start p-6 gap-10">
                <Image 
                    src={imageUrl} 
                    alt={altImgTxt}
                    width={640} 
                    height={360} 
                    className="rounded-lg shadow-lg"
                />
                <div className="max-w-md">
                    <p className="text-2xl font-semibold">{name}</p>
                    <p className="mt-2">£{price}</p>
                    <p className="mt-2">{description}</p>
                </div>
            </main>
        </div>
    );
}
