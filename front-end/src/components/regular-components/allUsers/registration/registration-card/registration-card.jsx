"use client"

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function RegistrationCard({ width = "60vw", height = "auto", margin = "20px", AuthURI}) {
    const [submitClicked, setSubmitClicked] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        telephone: "",
        address: "",
        postCode: "",
    });

    const router = useRouter();

    useEffect(() => {
        // Effect triggered when submit is clicked
        if (submitClicked) {
            const reqBody = {
                email: formData.email,
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
                        router.push("/");
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
            {[
                { name: "email", type: "email", placeholder: "Enter your email" },
                { name: "password", type: "password", placeholder: "Create a password" },
                { name: "firstName", type: "text", placeholder: "First Name" },
                { name: "lastName", type: "text", placeholder: "Last Name" },
                { name: "telephone", type: "tel", placeholder: "Phone Number" },
                { name: "address", type: "text", placeholder: "Address" },
                { name: "postCode", type: "text", placeholder: "Post Code" }
            ].map((field, idx) => (
                <input
                    key={idx}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    aria-label={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 hover:bg-gray-100 focus:ring-orange-600 mb-2"
                />
            ))}

            {/* Submit Button */}
            <button
                type="submit"
                aria-label="Submit Registration"
                className="w-full py-2 mt-4 bg-[#FF4D00] text-white font-semibold rounded-md hover:bg-[#c21300] focus:outline-none focus:ring-2 ring-orange-600"
            >
                Register
            </button>
        </form>
    );
}