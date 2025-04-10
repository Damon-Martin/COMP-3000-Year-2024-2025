'use client'

import Link from 'next/link';

// Text color either white or black
export default function PurchaseButton({ text, bgColor, color, width, height }) {
    return (
        <button
            className={`bg-[${bgColor}] text-${color} mt-1 w-${width} h-${height} rounded-sm`}
        >
            {text}
        </button>
    );
}
