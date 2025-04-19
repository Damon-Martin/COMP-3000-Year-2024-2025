import Link from 'next/link'

export default function CategorySideBar() {

    return (
        <Link href="/categories" aria-label="Link to Categories Page" className="bg-[#FF4D00] hover:bg-[#c21300] text-white m-3 ml-0 h-[74vh] w-[15vw] flex items-center justify-center">
            <p>Categories</p>
        </Link>
  );
}