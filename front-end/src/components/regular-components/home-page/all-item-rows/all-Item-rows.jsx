import ItemCardDesktop from "../item-card/item-card-desktop";
import ItemRowHomeDesktop from "../item-row/item-row";

// Chunking the list into arrays of 5
function chunkItems(array, size) {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
}

export default function AllItemsCardHome({ ItemList }) {
    const chunkedItemList = chunkItems(ItemList, 5);

    return (
        <div className="flex flex-col">
            {chunkedItemList.map((chunk, index) => (
                <ItemRowHomeDesktop key={index} chunkOfItemList={chunk} />
            ))}
        </div>
    );
}
