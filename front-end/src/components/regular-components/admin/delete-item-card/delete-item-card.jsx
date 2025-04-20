"use client";
import { useState } from "react";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function DeleteItemCard({ itemList }) {
    const [selectedItemID, setSelectedItemID] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setSelectedItemID(e.target.value);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!selectedItemID) return alert("Please select an item to delete.");

        const token = localStorage.getItem("token");
        if (!token) {
            alert("User is not authenticated.");
            return;
        }

        const confirmDelete = confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return;

        setIsLoading(true);
        try {
            const res = await fetch(`${BackendURI}/v1/items/${selectedItemID}`, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            });

            const data = await res.json();

            if (res.ok) {
                alert("Item deleted successfully!");
                setSelectedItemID("");
            } else {
                console.error(data);
                alert(data.error || "Failed to delete item");
            }
        } 
        catch (e) {
            console.error(e);
            alert("An error occurred while deleting the item.");
        } 
        finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleDelete}
            className="w-full mt-3 max-w-xl bg-white text-black p-6 rounded-lg shadow-md space-y-4"
        >
            <h2 className="text-2xl font-bold text-center">Delete an Item</h2>

            <div>
                <label className="block mb-1 font-medium">Select Item</label>
                <select
                    name="selectedItemID"
                    value={selectedItemID}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="">Choose an item</option>
                    {itemList.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name} — ${item.price.toFixed(2)}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                title="Delete Selected Item"
                disabled={isLoading}
                className={`w-full py-2 text-white font-semibold rounded-md ${
                    isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                }`}
            >
                {isLoading ? "Deleting..." : "Delete Item"}
            </button>
        </form>
    );
}
