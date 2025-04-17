import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import Link from 'next/link'

export default function CategoriesPageMobile({ categoriesList }) {
    return (
        <div>
            <NavBarSwitcher />
            {/* Smaller gap is better for mobile */}
            <div className="rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {categoriesList.map(category => (
                    <Link href="/" key={category._id} className="bg-[#D9D9D9] hover:bg-gray-100 border rounded-xl overflow-hidden shadow-md">
                        <img
                            src={category.imageURL}
                            alt={category.altImgTxt}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 text-center font-semibold text-lg text-black">
                            {category.categoryName}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
