import Link from 'next/link'
import Image from 'next/image'

export default function AccountsButtonDesktopLarge({ src, title = "INSERT TITLE", ariaLabel, imgUrl }) {
    return (
        <Link 
            href={src} 
            aria-label={ariaLabel} 
            title={ariaLabel} 
            className="bg-[#D9D9D9] hover:bg-gray-100 text-black mt-3 min-w-[70vw] min-h-[20vh] max-h-[20vh] rounded-lg flex items-center"
        >
            <div className='flex flex-row items-center m-3'>
                <Image src={imgUrl} className="w-[15vh] h-[15vh]" />
                {/* Self Start makes the text higher than the middle */}
                <p className='text-xl font-bold ml-3 self-start mt-2'>{title}</p>
            </div>
        </Link>
    )
}
