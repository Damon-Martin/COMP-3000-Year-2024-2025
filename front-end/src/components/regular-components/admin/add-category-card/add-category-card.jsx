"use client";

import { useState } from "react";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function AddCategoryCard() {
    const [formData, setFormData] = useState({
		categoryName: "",
		imageURL: "",
		altImgTxt: "",
    });

    const [isLoading, setIsLoading] = useState(false);

	// Grabbing the form data and mapping it to an object using the spread operator
    const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
    };

	// Performs the POST REQUST
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
				categoryName: formData.categoryName.trim(),
				imageURL: formData.imageURL.trim(),
				altImgTxt: formData.altImgTxt.trim(),
			};

			const res = await fetch(`${BackendURI}/v1/items/create-category`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify(payload),
			});

			const data = await res.json();

			if (res.ok) {
				alert("Category created successfully!");
				setFormData({
					categoryName: "",
					imageURL: "",
					altImgTxt: "",
				});
			} 
			else {
				console.error(data);
				alert(data.error || "Failed to create category");
			}
		} 
		catch (e) {
			console.error(e);
			alert("An error occurred while creating the category.");
		} 
		finally {
			setIsLoading(false);
		}
    };

    return (
		<form
			onSubmit={handleSubmit}
			className="w-full mt-3 max-w-xl bg-white text-black p-6 rounded-lg shadow-md space-y-4"
		>
			<h2 className="text-2xl font-bold text-center">Create New Category</h2>

			{/* Object used to make the form */}
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

			{/* Submit the POST REQUEST: Grey if loading and Orange when it's ready to be POSTED */}
			<button
				type="submit"
				title="Submit New Category"
				disabled={isLoading}
				className={`w-full py-2 text-white font-semibold rounded-md ${
					isLoading
					? "bg-gray-400 cursor-not-allowed"
					: "bg-[#FF4D00] mt-3 hover:bg-[#c21300]"
			}`}>
				{isLoading ? "Creating..." : "Create Category"}
			</button>
      </form>
    );
}