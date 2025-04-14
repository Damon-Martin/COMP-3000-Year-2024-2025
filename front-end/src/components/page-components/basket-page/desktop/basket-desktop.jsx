import PurchaseButton from "@/components/regular-components/item-page/buttons/purchase-btn"

export default function BasketDesktop({ basketList, loginStatus }) {
    const PurchasePressed = () => {
        alert("Purchase pressed")
    }
    return (
        <div className="flex flex-col justify-between m-3 min-h-[42vh] max-h-[42vh] max-w-[60vw]">
            <div className="flex flex-col overflow-auto h-[37vh] max-h-[37vh] max-w-[60vw]">
                {JSON.stringify(basketList)}
            </div>
            <PurchaseButton 
                text="Buy Now" 
                bgColor="#FF4D00" 
                textColor="white" 
                onClick={PurchasePressed}
            />
        </div>
    )
}