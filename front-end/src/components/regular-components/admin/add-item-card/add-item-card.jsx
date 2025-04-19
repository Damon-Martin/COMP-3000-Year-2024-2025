"use client";
import { useState } from "react";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd
  ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
  : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function AddItemCard({ CategoryDetails }) {
  const [formData, setFormData] = useState({
    categoryID: "",
    itemName: "",
    imageURL: "",
    altImgTxt: "",
    itemDescription: "",
    price: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User is not authenticated.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        categoryID: formData.categoryID,
        itemDetails: {
          itemName: formData.itemName.trim(),
          imageURL: formData.imageURL.trim(),
          altImgTxt: formData.altImgTxt.trim(),
          itemDescription: formData.itemDescription.trim(),
          price: parseFloat(formData.price),
        },
      };

      const res = await fetch(`${BackendURI}/v1/items/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Item created successfully!");
        setFormData({
          categoryID: "",
          itemName: "",
          imageURL: "",
          altImgTxt: "",
          itemDescription: "",
          price: "",
        });
      } else {
        console.error(data);
        alert(data.error || "Failed to create item");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred while creating the item.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mt-3 max-w-xl bg-white text-black p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Add New Item</h2>

      {/* Category Dropdown */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          name="categoryID"
          value={formData.categoryID}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
        >
          <option value="">Select a category</option>
          {CategoryDetails?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Input Fields */}
      {[
        {
          label: "Item Name",
          name: "itemName",
          placeholder: "Leather Jacket",
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
          placeholder: "Image of leather jacket",
          type: "text",
        },
        {
          label: "Item Description",
          name: "itemDescription",
          placeholder: "A sleek leather jacket for all seasons.",
          type: "text",
        },
        {
          label: "Price",
          name: "price",
          placeholder: "99.99",
          type: "number",
          step: "0.01",
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
            step={field.step || undefined}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>
      ))}

      {/* Submit Button */}
      <button
        type="submit"
        title="Submit New Item"
        disabled={isLoading}
        className={`w-full py-2 text-white font-semibold rounded-md ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#FF4D00] mt-3 hover:bg-[#c21300]"
        }`}
      >
        {isLoading ? "Creating..." : "Create Item"}
      </button>
    </form>
  );
}
