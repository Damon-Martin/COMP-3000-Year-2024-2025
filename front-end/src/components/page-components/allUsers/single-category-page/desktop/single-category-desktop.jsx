import Image from "next/image";
import Link from "next/link"
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import CategorySideBar from "@/components/regular-components/allUsers/home-page/side-bar/category-side-bar";
import SupportButton from "@/components/regular-components/allUsers/all-pages/support-btn/support-btn";

export default function SingleCategoryDesktop({ categoryName="INSERT CATEGORY NAME", itemList=[] }) {
    return (
        <div>
            <NavBarSwitcher />
            <div className="flex flex-row m-3 min-h[74vh] max-h-[74vh] overflow-clip">
                <main className="mr-4">
                    {/* Rendering items as a grid */}
                    <h1 className="text-2xl font-bold my-4" tabIndex={0} aria-label={`${categoryName}`}>{categoryName}</h1>
                    <div className=" overflow-auto min-w-[83vw] max-w-[83vw] max-h-[65vh] text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {itemList.map(item => (
                            <Link
                                href={`/item/${item._id}`}
                                aria-label={`Link to ${item.name}`}
                                key={item._id}
                                className="bg-[#D9D9D9] hover:bg-gray-100 border rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                            >
                                <div className="relative w-full h-60">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.altImgTxt}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-t-2xl"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="font-bold">£{item.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>
                <CategorySideBar />
            </div>
            <SupportButton />
        </div>
    );
}