import ItemCardDesktop from "../item-card/item-card-desktop";

// Push 5 items from ItemList to chunkOfItemList (each row)
export default function ItemRowHomeDesktop({ chunkOfItemList }) {
    return (
        <div className="flex justify-left gap-4">
            {chunkOfItemList.map((item) => (
                <ItemCardDesktop key={item._id} item={item} name={item.name} price={item.price} imageURL={item.imageUrl} altTxtImage={item.altTxtImage} />
            ))}
        </div>
    );
}
