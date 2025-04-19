'use client'

import SupportButton from "@/components/regular-components/allUsers/all-pages/support-btn/support-btn";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import SearchResultButtonMobile from "@/components/regular-components/allUsers/result-button.jsx/mobile/search-result-button";
import SearchBar from "@/components/regular-components/allUsers/search-bar/search-bar";
import Link from "next/link";

export default function HomeMobile({ ItemList = [] }) {
    return (
        <div className="flex flex-col">
            <NavBarSwitcher />
            <main className="flex flex-col m-3">
                <SearchBar />

                <Link
                    href="/categories"
                    title="Link to Categories"
                    className="bg-[#FF4D00] mt-3 hover:bg-[#c21300] text-white min-h-[15vh] w-[94vw] rounded-lg flex items-center justify-center"
                >
                    <p>Categories</p>
                </Link>

                <h1 className="text-2xl font-bold my-4">Best Selling</h1>

                {ItemList.map(currentItem => (
                    <SearchResultButtonMobile
                        key={currentItem._id}
                        item={currentItem}
                        name={currentItem.name}
                        price={currentItem.price}
                        imageURL={currentItem.imageUrl}
                        altTxtImage={currentItem.altImgTxt}
                    />
                ))}
            </main>
            <SupportButton />
        </div>
    );
}