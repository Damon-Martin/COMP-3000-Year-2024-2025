import Link from 'next/link'

// This is for the buttons in the setting menu
export default function SettingButton({ imgUrl, title, description, redirectUrl }) {
    return (
        <Link aria-label={`Link to ${title}`} className="bg-[#D9D9D9] text-black w-[95vw] h-[15vh] rounded-xl mb-3" href={redirectUrl}>
            <h2 className='text-xl font-bold'>{title}</h2>
            <p>{description}</p>
        </Link>
    );
}