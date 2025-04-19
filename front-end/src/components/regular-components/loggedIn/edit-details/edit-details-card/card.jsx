import { useState } from "react";
import { useRouter } from "next/navigation";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function EditDetailsCard({ initialPlaceholderValues, email, onSuccess }) {
    const [formData, setFormData] = useState({
        fName: null,
        lName: null,
        tel: null,
        address: null,
        postcode: null,
        newEmail: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

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
    
        try {
            // Cloning the form for filtering
            let updatedFormData = { ...formData };
    
            // if there is the same email it should be omited from the patch req
            if (updatedFormData.newEmail === email) {
                updatedFormData.newEmail = null;
            }
    
            // Clean formData by removing null or empty values
            const requestData = Object.fromEntries(
                Object.entries(updatedFormData).filter(([_, value]) => value !== null && value !== "")
            );
    
            // Checking there is at least 1 field to update
            if (Object.keys(requestData).length === 0) {
                alert("You must update at least 1 value");
                return;
            }
    
            const res = await fetch(`${BackendURI}/v1/user-details?email=${email}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(requestData),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                router.push("/view-details");
            } 
            else if (res.status === 409) {
                alert("Email is already taken");
            } 
            else {
                alert("Failed to update details");
                console.error(data.error);
            }
        } 
        catch (e) {
            console.error(e);
            alert("An error occurred while updating details.");
        } 
        finally {
            setIsLoading(false);
        }
    };
    

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full mt-3 max-w-xl bg-[#D9D9D9] text-black p-6 rounded-lg shadow-md space-y-4"
        >
            <h2 className="text-2xl font-bold text-center">Edit Your Details</h2>

            {/* Setting the initial values as the users current values */}
            {[ 
                { label: "First Name", name: "fName", type: "text", placeholder: initialPlaceholderValues.fName || "Enter your first name" },
                { label: "Last Name", name: "lName", type: "text", placeholder: initialPlaceholderValues.lName || "Enter your last name" },
                { label: "Telephone Number", name: "tel", type: "tel", placeholder: initialPlaceholderValues.tel || "Enter your telephone number" },
                { label: "Address", name: "address", type: "text", placeholder: initialPlaceholderValues.address || "Enter your address" },
                { label: "Postcode", name: "postcode", type: "text", placeholder: initialPlaceholderValues.postcode || "Enter your postcode" },
                { label: "Email", name: "newEmail", type: "email", placeholder: email || "Enter your email" },
            ].map((field, idx) => (
                <div key={idx}>
                    <label className="block mb-1 font-medium">{field.label}</label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                </div>
            ))}

            {/* Submit Button and also shows the progress when it is loading */}
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 text-white font-semibold rounded-md ${
                    isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700"
                }`}
            >
                {isLoading ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
}