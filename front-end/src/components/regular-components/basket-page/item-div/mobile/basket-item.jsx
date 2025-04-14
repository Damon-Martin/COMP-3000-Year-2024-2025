import Image from 'next/image';
import { useRouter } from 'next/navigation'


export default function BasketItemMobile({ key, item, name = "Item Name", price = "XX.XX", imageURL, altTxtImage }) {
    const router = useRouter();
    const removeItem = (e) => {
        e.preventDefault();
        console.log("binPressed")
    }
    return (
        <div key={key} className="bg-[#D9D9D9] hover:bg-gray-100 text-black mt-4 min-w-[97vw] min-h-[15vh] max-h-[15vh] rounded-md flex items-center">
            <Image
                src={imageURL}
                placeholder="blur"
                alt={altTxtImage}
                className="rounded-md mr-4 min-h-[15vh] max-h-[15vh] min-w-[20vw] max-w-[20vw]"
            />
            <div className="flex flex-col justify-center pl-4">
                <p>{name}</p>
                <p>£{price}</p>
            </div>
        </div>
    );
}