'use client'


import SupportButton from "@/components/regular-components/allUsers/all-pages/support-btn/support-btn";
import CategorySideBar from "@/components/regular-components/allUsers/home-page/side-bar/category-side-bar";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import Link from 'next/link'

// Desktop variant: Page is more horizontal
export default function HomeDesktop({ ItemList }) {
    return (
        <div>
            <NavBarSwitcher />
            <main className="flex flex-row justify-center">
                <div id="Best Selling" className="m-3 min-w-[82vw] max-h-[74vh] overflow-auto">
                    <p className="font-bold text-xl mb-3">Best Selling</p>
                    {/* Using Tailwind GRIDS for more scalable grids */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                        {ItemList.map(item => (
                            <Link href={`/item/${item._id}`} aria-label={`Link to ${item.name}`} key={item._id} className="bg-[#D9D9D9] hover:bg-gray-100 text-black border rounded-xl overflow-hidden shadow-md">
                                <img
                                    src={item.imageUrl}
                                    alt={item.altImgTxt}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 text-center font-semibold text-lg">
                                    <div>{item.name}</div>
                                    <div className="mt-2 font-bold text-xl">£{item.price.toFixed(2)}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="ml-auto">
                    <CategorySideBar />
                </div>
                <SupportButton />
            </main>
        </div>
    );
}