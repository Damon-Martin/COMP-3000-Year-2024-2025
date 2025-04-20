"use client";

import { useState } from "react";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function DeleteCategoryCard({ categoryList }) {
    const [selectedCategoryID, setSelectedCategoryID] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setSelectedCategoryID(e.target.value);
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!selectedCategoryID) {
            return alert("Please select a category to delete.");
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("User is not authenticated.");
            return;
        }

        const confirmDelete = confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;

        setIsLoading(true);

        try {
            const res = await fetch(`${BackendURI}/v1/items/delete-category/${selectedCategoryID}`, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            });

            const data = await res.json();

            if (res.ok) {
                alert("Category deleted successfully!");
                setSelectedCategoryID("");
            } else {
                console.error(data);
                alert(data.error || "Failed to delete category");
            }
        } 
        catch (e) {
            console.error(e);
            alert("An error occurred while deleting the category.");
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
            <h2 className="text-2xl font-bold text-center">Delete Category</h2>

            <div>
                <label className="block mb-1 font-medium">Select Category</label>
                <select
                    name="selectedCategoryID"
                    value={selectedCategoryID}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <option value="">Choose a category</option>
                    {categoryList.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                title="Delete Selected Category"
                disabled={isLoading}
                className={`w-full py-2 text-white font-semibold rounded-md ${
                    isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                }`}
            >
                {isLoading ? "Deleting..." : "Delete Category"}
            </button>
        </form>
    );
}