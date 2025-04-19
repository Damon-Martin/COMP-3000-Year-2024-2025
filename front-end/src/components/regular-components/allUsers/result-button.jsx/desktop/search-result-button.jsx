import Image from 'next/image';
import { useRouter } from 'next/navigation'

export default function SearchResultButtonDesktop({ item, name = "Item Name", price = "XX.XX", imageURL, altTxtImage }) {
    const router = useRouter();
    const btnPressed = (e) => {
        e.preventDefault();
        router.push(`/item/${item._id}`)
    }
    return (
        <button aria-label={`Link to ${name}`} onClick={btnPressed} type="button" key={item._id} className="bg-[#D9D9D9] hover:bg-gray-100 text-black mt-4 min-w-[97vw] min-h-[15vh] max-h-[15vh] rounded-md flex items-center">
            <Image
                src={imageURL}
                placeholder="blur"
                alt={altTxtImage}
                className="rounded-md mr-4 min-h-[15vh] max-h-[15vh] min-w-[10vw] max-w-[10vw]"
            />
            <div className="flex flex-col justify-center pl-4">
                <p>{name}</p>
                <p tabIndex={0} aria-label={`Costs £${price}`}>£{price}</p>
            </div>
        </button>
    );
}