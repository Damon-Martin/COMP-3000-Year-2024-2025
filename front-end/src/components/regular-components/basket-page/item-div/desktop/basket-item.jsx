import Image from 'next/image';
import Link from 'next/link'; // import Link from next
import { useRouter } from 'next/navigation';

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd 
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD 
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function BasketItemDesktop({
    key,
    item,
    name = "Item Name",
    price = "XX.XX",
    imageURL,
    altTxtImage,
    // Below are useState
    setBasket,
    loginStatus,
    setLoginStatus
}) {
    const router = useRouter();

    const removeItem = (e) => {
        e.preventDefault();

        if (loginStatus == "loggedOut") {
            const rawBasket = localStorage.getItem("clientBasket");

            if (rawBasket) {
                let basket = JSON.parse(rawBasket).basket;
                const idToRemove = item.id;

                if (idToRemove) {
                    const index = basket.findIndex(item => item.id === idToRemove);

                    if (index !== -1) {
                        // Item found, remove it
                        basket.splice(index, 1);
    
                        // Save updated basket back to localStorage
                        localStorage.setItem("clientBasket", JSON.stringify({ basket }));
                        setBasket(basket);
                    } 
                    else {
                        console.log("Item not found in basket.");
                    }
                }
            }
            
        }
        // LoggedIn
        else {
            const idToRemove = item.id;

            const token = localStorage.getItem("token");

            // Mising Token
            if (!token) {
                setLoginStatus("loggedOut")
            }

            // Deleting Item
            else {
                const deleteItem = async () => {
                    const rawRes = await fetch(`${BackendURI}/v1/basket/delete-item?id=${idToRemove}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        }
                    })

                    // Deletion succeeded
                    if (rawRes.ok) {
                        // Fetching items to get the new basket
                        const fetchItems = async () => {
            
                            const rawRes = await fetch(`${BackendURI}/v1/basket/get-basket`, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`
                                }
                            });
            
                            if (rawRes.status != 200) {
                                alert("Failed to fetch new basket")
                            }
                            // Fetched Items
                            else {
                                const data = await rawRes.json();
                                const basket = data.basket;
                                setBasket(basket);
                            }
                        }
            
                        fetchItems();
                    }
                    else {
                        alert("Failed to delete item from basket")
                    }
                }

                deleteItem();
                console.log("Attempting Delete item")
            }
        }
    }

    return (
        <div
            key={key}
            className="bg-[#D9D9D9] text-black mt-4 min-w-[58.5vw] max-w-[58.5vw] min-h-[15vh] max-h-[15vh] rounded-md flex items-center justify-between"
        >
            {/* Left side: Image + Text */}
            <div className="flex items-center">
                <Image
                    src={imageURL}
                    placeholder="blur"
                    alt={altTxtImage}
                    className="rounded-md min-h-[15vh] max-h-[15vh] min-w-[10vw] max-w-[10vw]"
                />
                <div className="flex flex-col justify-center pl-4">
                    <Link
                        href={`/item/${item.id}`}
                        className="text-left underline text-blue-600 hover:text-blue-800"
                        aria-label={`Go to ${name}`}
                        tabIndex={0}
                    >
                        {name}
                    </Link>
                    <p tabIndex={0} aria-label={`£${price}`}>£{price}</p>
                </div>
            </div>

            {/* Right side: Delete Button */}
            <button
                onClick={removeItem}
                className="text-red-600 text-2xl hover:text-red-800 transition-colors pr-4"
                aria-label="Remove item"
                title="Remove item"
                tabIndex={0}
            >
                🗑️
            </button>
        </div>
    );
}