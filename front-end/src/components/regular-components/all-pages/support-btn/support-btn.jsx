import Link from 'next/link';
import Image from 'next/image';

export default function SupportButton() {
    return (
        <Link href="/login">
            <div
                className="fixed bottom-4 right-4 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                style={{ width: "10dvh", height: "10dvh" }}
                tabIndex={0}
            >
                <Image 
                    src="/images/support-icon/support-icon.svg" 
                    width={40}
                    alt="Support Icon" 
                />
            </div>
        </Link>
    );
}