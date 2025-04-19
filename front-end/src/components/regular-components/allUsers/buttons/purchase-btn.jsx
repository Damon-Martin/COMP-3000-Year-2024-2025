'use client';

export default function PurchaseButton({ text, bgColor, textColor, onClick }) {
    return (
        <button
            style={{ backgroundColor: bgColor, color: textColor }}
            className="w-full py-2 rounded-md font-semibold shadow-sm transition-colors duration-200"
            aria-label={`${text}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
