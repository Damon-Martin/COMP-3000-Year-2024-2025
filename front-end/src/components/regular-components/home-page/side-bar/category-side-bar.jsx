import Link from 'next/link'

export default function CategorySideBar({ fontSizeMultiplier }) {
    // Setting the root font size based on the fontSizeMultiplier
    const rootFontSize = `${16 * fontSizeMultiplier}px`;

    return (
        <Link href="/login">
            <div className="bg-[#FF4D00] m-1 h-[75dvh] w-[15dvw] flex items-center justify-center">
                <p style={{ color: "white", fontSize: rootFontSize }}>Categories</p>
            </div>
        </Link>
  );
}