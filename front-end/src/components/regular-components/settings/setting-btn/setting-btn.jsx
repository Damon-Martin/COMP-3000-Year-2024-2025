import './setting-btn.css'
import Link from 'next/link'

// This is for the buttons in the setting menu
export default function SettingButton({ imgUrl, title, description, redirectUrl }) {
    return (
        <Link id="setting-btn" href={redirectUrl}>
            <h2>{title}</h2>
            <p>{description}</p>
        </Link>
    );
}