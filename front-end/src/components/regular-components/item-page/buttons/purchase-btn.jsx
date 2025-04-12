'use client';

export default function PurchaseButton({ text, bgColor, textColor }) {
    return (
        <button
            style={{ backgroundColor: bgColor, color: textColor }}
            className="w-full py-2 rounded-md font-semibold shadow-sm transition-colors duration-200"
        >
            {text}
        </button>
    );
}
