import Link from 'next/link'

export default function CategorySideBar() {

    return (
        <Link href="/login">
            <div className="bg-[#FF4D00] hover:bg-[#c21300] text-white m-1 h-[69dvh] w-[15dvw] flex items-center justify-center">
                <p>Categories</p>
            </div>
        </Link>
  );
}