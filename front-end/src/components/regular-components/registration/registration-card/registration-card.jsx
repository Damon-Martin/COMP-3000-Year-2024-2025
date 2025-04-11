import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_FRONT_END_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function RegistrationCard({ width = "60vw", height = "auto", margin = "20px" }) {
    const [submitClicked, setSubmitClicked] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        telephone: "",
        address: "",
        postCode: "",
    });
    
    useEffect(() => {

        // Effect triggered when submit is clicked
        if (submitClicked) {
            const reqBody = {
                username: formData.username,
                password: formData.password,
                userDetails: {
                    fName: formData.firstName,
                    lName: formData.lastName,
                    tel: formData.telephone,
                    address: formData.address,
                    postcode: formData.postCode,
                },
            };

            const submitDetails = async (regDetails) => {
                try {
                    const rawRes = await fetch(`${AuthURI}/v1/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(regDetails),
                    });

                    const data = await rawRes.json();

                    // Success and Redirect
                    if (rawRes.status === 200) {
                        localStorage.setItem("token", data.token);
                        console.log("User Registered Correctly")
                        // Redirect Here after successful registration
                    } 
                    else {
                        alert(data.error);
                    }
                } 
                catch (e) {
                    alert("Error during registration:");
                    console.error(e);
                }
            };

            submitDetails(reqBody).finally(() => {
                setSubmitClicked(false); // after press set it to unPressed again
            });
        }
    }, [submitClicked, formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitClicked(true); // Trigger the effect
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                width: width,
                height: height,
                margin: margin,
                backgroundColor: "#D9D9D9",
                borderRadius: "0.375rem",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "2rem",
            }}
            className="flex flex-col justify-center items-center text-black space-y-2"
        >
            <h2 className="text-2xl font-semibold m-1 text-center">Registration</h2>

            {/* Input Fields */}
            {["username", "password", "firstName", "lastName", "telephone", "address", "postCode"].map((field, idx) => (
                <input
                    key={idx}
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 hover:bg-gray-100 focus:ring-orange-600 mb-2"
                />
            ))}

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-2 mt-4 bg-[#FF4D00] text-white font-semibold rounded-md hover:bg-[#c21300] focus:outline-none focus:ring-2 ring-orange-600"
            >
                Register
            </button>
        </form>
    );
}