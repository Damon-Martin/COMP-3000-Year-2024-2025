"use client";

import { useState } from "react";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function UpdateCategoryCard({ categoryList }) {
    const [selectedCategoryID, setSelectedCategoryID] = useState("");
    const [formData, setFormData] = useState({
        categoryName: "",
        imageURL: "",
        altImgTxt: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = (e) => {
        const id = e.target.value;
        setSelectedCategoryID(id);
        const selected = categoryList.find((cat) => cat._id === id);

        if (selected) {
            setFormData({
                categoryName: selected.categoryName || "",
                imageURL: selected.imageURL || "",
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
        if (!selectedCategoryID) return alert("Please select a category to update.");
        const token = localStorage.getItem("token");

        if (!token) {
            alert("User is not authenticated.");
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                categoryName: formData.categoryName.trim(),
                imageURL: formData.imageURL.trim(),
                altImgTxt: formData.altImgTxt.trim(),
            };

            const res = await fetch(`${BackendURI}/v1/items/update-category/${selectedCategoryID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Category updated successfully!");
            } else {
                console.error(data);
                alert(data.error || "Failed to update category");
            }
        } catch (e) {
            console.error(e);
            alert("An error occurred while updating the category.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full mt-3 max-w-xl bg-white text-black p-6 rounded-lg shadow-md space-y-4"
        >
            <h2 className="text-2xl font-bold text-center">Update Category</h2>

            <div>
                <label className="block mb-1 font-medium">Select Category</label>
                <select
                    value={selectedCategoryID}
                    onChange={handleSelect}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                >
                    <option value="">Choose a category to update</option>
                    {categoryList.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.categoryName}
                        </option>
                    ))}
                </select>
            </div>

            {[
                {
                    label: "Category Name",
                    name: "categoryName",
                    placeholder: "Men's T-Shirts",
                    type: "text",
                },
                {
                    label: "Image URL",
                    name: "imageURL",
                    placeholder: "https://example.com/image.jpg",
                    type: "url",
                },
                {
                    label: "Alt Image Text",
                    name: "altImgTxt",
                    placeholder: "Image of a Jacket",
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
                title="Update Category"
                disabled={isLoading}
                className={`w-full py-2 text-white font-semibold rounded-md ${
                    isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#FF4D00] mt-3 hover:bg-[#c21300]"
                }`}
            >
                {isLoading ? "Updating..." : "Update Category"}
            </button>
        </form>
    );
}