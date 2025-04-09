"use client";

import { useRouter } from "next/navigation"; // Import useRouter instead of redirect
import { useState } from "react";

import LoginBtnRow from "../login-button-row/login-btn-row";

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_FRONT_END_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function LoginCard({color = "#D9D9D9", width = "w-full", minWidth = "min-w-80", maxWidth = "max-w-xl", height = "h-full", minHeight = "min-h-80", maxHeight = "max-h-[800px]", marginSides = "mx-10", marginTop = "mt-10" }) {
    const router = useRouter(); // Initialize useRouter()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const missingDetails = () => {
        alert("Missing Username or Password");
    };

    const submitDetails = async (e) => {
        e.preventDefault();

        if (!username || !password) {
        return missingDetails();
        }

        const reqBody = { username, password };

        try {
            const rawRes = await fetch(`${AuthURI}/v1/login`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            });

            const data = await rawRes.json();

            if (rawRes.status === 200) {
                localStorage.setItem("token", data.token);
                router.push("/"); // ✅ Correct client-side redirection
            } else {
                alert("Incorrect Login Details");
            }
        } 
        catch (e) {
            alert("Failed to send login details to server");
        }
  };

  return (
    <form
        onSubmit={submitDetails}
        className={`text-black ${width} ${minWidth} ${maxWidth} ${height} ${minHeight} ${maxHeight} ${marginTop} md:${marginSides} flex items-center justify-center p-5 rounded-lg shadow-lg`}
        style={{ backgroundColor: color }}
    >
      <div className="text-center space-y-4">
        <p className="text-2xl font-semibold">Login</p>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <LoginBtnRow />
      </div>
    </form>
  );
}
