"use client";

import { useState } from "react";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function UpdateItemCard({ itemList }) {
    const [selectedItemID, setSelectedItemID] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        altImgTxt: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = (e) => {
        const id = e.target.value;
        setSelectedItemID(id);
        const selected = itemList.find((item) => item._id === id);

        if (selected) {
            setFormData({
                name: selected.name || "",
                description: selected.description || "",
                price: selected.price || "",
                imageUrl: selected.imageUrl || "",
                altImgTxt: selected.altImgTxt || "",
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedItemID) return alert("Please select an item to update.");
        const token = localStorage.getItem("token");
        if (!token) {
            alert("User is not authenticated.");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: parseFloat(formData.price),
                imageUrl: formData.imageUrl.trim(),
                altImgTxt: formData.altImgTxt.trim(),
            };

            const res = await fetch(`${BackendURI}/v1/items/${selectedItemID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Item updated successfully!");
            } else {
                console.error(data);
                alert(data.error || "Failed to update item");
            }
        } catch (e) {
            console.error(e);
            alert("An error occurred while updating the item.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full mt-3 max-w-xl bg-white text-black p-6 rounded-lg shadow-md space-y-4"
        >
            <h2 className="text-2xl font-bold text-center">Update Item</h2>

            <div>
                <label className="block mb-1 font-medium">Select Item</label>
                <select
                    value={selectedItemID}
                    onChange={handleSelect}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                >
                    <option value="">Choose an item</option>
                    {itemList.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name} — ${item.price.toFixed(2)}
                        </option>
                    ))}
                </select>
            </div>

            {[
                {
                    label: "Item Name",
                    name: "name",
                    placeholder: "Leather Jacket",
                    type: "text",
                },
                {
                    label: "Description",
                    name: "description",
                    placeholder: "High-quality leather jacket for all seasons.",
                    type: "text",
                },
                {
                    label: "Price",
                    name: "price",
                    placeholder: "89.99",
                    type: "number",
                },
                {
                    label: "Image URL",
                    name: "imageUrl",
                    placeholder: "https://example.com/item.jpg",
                    type: "url",
                },
                {
                    label: "Alt Image Text",
                    name: "altImgTxt",
                    placeholder: "Image of a leather jacket",
                    type: "text",
                },
            ].map((field, idx) => (
                <div key={idx}>
                    <label className="block mb-1 font-medium">{field.label}</label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        aria-label={field.label}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                </div>
            ))}

            <button
                type="submit"
                title="Update Item"
                disabled={isLoading}
                className={`w-full py-2 text-white font-semibold rounded-md ${
                    isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#FF4D00] mt-3 hover:bg-[#c21300]"
                }`}
            >
                {isLoading ? "Updating..." : "Update Item"}
            </button>
        </form>
    );
}