'use client'

import { useEffect, useState } from "react";
import { redirect } from 'next/navigation'
import LoginDesktop from "@/components/page-components/login-page/desktop/login-desktop";


const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_FRONT_END_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function LoginPage() {
    const [loginStatus, setLoginStatus] = useState("loggedOut");
  
    useEffect(() => {
        const isUserLoggedIn = async () => {
        const token = localStorage.getItem("token");

            try {
                if (token) {
                    const res = await fetch(`${AuthURI}/v1/validateJWT`, {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token: token }),
                    });
            
                    const data = await res.json();
                    
                    if (data.admin == "admin") {
                        setLoginStatus("admin")
                    }
                    else if (res.status == 200) {
                        setLoginStatus("loggedIn");
                    }
                    else {
                        localStorage.removeItem("token");
                        setLoginStatus("loggedOut");
                    }
                }
            } 
            catch (e) {
                console.error("JWT Checker Fetch Failed: ", e);
            }
        };

        isUserLoggedIn();

    }, [loginStatus]);

    if (loginStatus != "loggedOut") {
        redirect("/");
    }

    return (
      <LoginDesktop />
    );
}
