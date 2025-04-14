"use client"

import BasketItemDesktop from "@/components/regular-components/basket-page/item-div/desktop/basket-item"
import PurchaseButton from "@/components/regular-components/item-page/buttons/purchase-btn"


export default function BasketDesktop({ basketList, setBasket, loginStatus, setLoginStatus }) {

    // Calculating the the total price
    const totalPrice = basketList?.length > 0 
        ? basketList.reduce((total, item) => total + item.price, 0).toFixed(2)
        : "0.00"; // If basket is empty, set the price to 0.00

    const PurchasePressed = () => {
        alert("Purchase pressed")
    }
    return (
        <div className="flex justify-center">
            <div className="flex flex-col justify-between m-3 min-h-[70vh] max-h-[70vh] min-w-[60-w] max-w-[60vw]">
            <p className="text-xl mb-1">Total: £{totalPrice}</p>
                <div className="flex flex-col overflow-auto min-h-[64vh] max-h-[64vh] min-w-[60vw] max-w-[60vw]">
                    {basketList && basketList.length > 0 ? (
                            basketList.map((item, index) => (
                                <BasketItemDesktop
                                    key={index}
                                    item={item}
                                    name={item.name}
                                    price={item.price}
                                    imageURL={item.imageUrl}
                                    altTxtImage={item.name}
                                    setBasket={setBasket}
                                    loginStatus={loginStatus}
                                    setLoginStatus={setLoginStatus}
                                />
                            ))
                    ) : (
                        <p>Your basket is empty.</p>
                    )}
                </div>
                <PurchaseButton 
                    text="Buy Now" 
                    bgColor="#FF4D00" 
                    textColor="white" 
                    onClick={PurchasePressed}
                />
            </div>
        </div>
    )
}