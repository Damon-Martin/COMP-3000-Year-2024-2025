import PurchaseButton from "@/components/regular-components/item-page/buttons/purchase-btn"

export default function ({ basketList, loginStatus }) {
    const PurchasePressed = () => {
        alert("Purchase pressed")
    }
    return (
        <div className="flex flex-col justify-center">
            {JSON.stringify(basketList)}
            <PurchaseButton 
                text="Buy Now" 
                bgColor="#FF4D00" 
                textColor="white" 
                onClick={PurchasePressed}
            />
        </div>
    )
}