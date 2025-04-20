import Link from 'next/link';
import Image from 'next/image';

export default function SupportButton() {
    return (
        <Link
            href="/support"
            className="w-[10vh] h-[10vh] fixed bottom-4 right-4 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
            aria-label="Link to Support Page"
            title="Link to Support Page"
        >
            <Image 
                src="/images/support-icon/support-icon.svg" 
                width={40}
                alt="Support Icon" 
            />
        </Link>
    );
}
