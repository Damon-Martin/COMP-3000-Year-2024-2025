import Link from 'next/link'

export default function CategorySideBar() {
    return (
        <Link href="/login">
            <div className="bg-[#FF4D00] h-[80dvh] w-[15dvw] flex items-center justify-center">
                <h3 className="text-white">Categories</h3>
            </div>
        </Link>
  );
}