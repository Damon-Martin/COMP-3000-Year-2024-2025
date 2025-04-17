'use client'

import Image from "next/image";
import Link from "next/link";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import SearchBar from "@/components/regular-components/allUsers/search-bar/search-bar";
import SearchResultButtonMobile from "@/components/regular-components/allUsers/result-button.jsx/mobile/search-result-button";

export default function SingleCategoryMobile({ categoryName = "INSERT CATEGORY NAME", itemList = [] }) {
    return (
        <div className="flex flex-col">
            <NavBarSwitcher />
            <main className="flex flex-col m-3">
                <SearchBar />

                <Link
                    href="/categories"
                    className="bg-[#FF4D00] mt-3 hover:bg-[#c21300] text-white min-h-[15vh] w-[94vw] rounded-lg flex items-center justify-center"
                >
                    <p>Categories</p>
                </Link>

                <h1 className="text-2xl font-bold my-4">{categoryName}</h1>

                <div className="flex flex-col text-black">
                    {itemList.map((item) => (
                        <SearchResultButtonMobile
                            key={item._id}
                            item={item}
                            name={item.name}
                            price={item.price}
                            imageURL={item.imageUrl}
                            altTxtImage={item.altImgTxt}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}