"use client";

import HomeDesktop from "@/components/page-components/home-page/desktop/home-desktop";
import HomeMobile from "@/components/page-components/home-page/mobile/home-mobile";
import SupportMobile from "@/components/page-components/support-page/mobile/customer/support-mobile";
import SupportDesktop from "@/components/page-components/support-page/desktop/customer/support-desktop";
import SupportMobileAdmin from "@/components/page-components/support-page/mobile/admin/support-mobile-admin";
import SupportDesktopAdmin from "@/components/page-components/support-page/desktop/admin/support-desktop-admin";

import { useState, useEffect } from "react";
import { io } from 'socket.io-client';

const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";

const SupportURI = isProd 
    ? process.env.NEXT_PUBLIC_SUPPORT_URI_PROD 
    : process.env.NEXT_PUBLIC_SUPPORT_URI;

const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;

export default function SupportPage() {
    const [loginStatus, setLoginStatus] = useState("loggedOut");
    const [username, setUsername] = useState(`user${Math.floor(Math.random() * 10000)}`);
    const [activeUsers, setActiveUsers] = useState({})
    const [isMobile, setIsMobile] = useState(false);
    const [socket, setSocket] = useState(null);

    // Determines to render desktop or mobile components
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        handleResize(); // Checking the initial screen size
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Checking loginStatus and Setting Username
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
                    

                    if (data.admin === "admin") {
                        setLoginStatus("admin");
                        setUsername(data.email)
                    } 
                    else if (res.status === 200) {
                        setLoginStatus("loggedIn");
                        setUsername(data.email)
                    } 
                    else {
                        localStorage.removeItem("token");
                        setLoginStatus("loggedOut");
                    }
                }
            } catch (e) {
                console.error("JWT Checker Fetch Failed: ", e);
            }
        };

        isUserLoggedIn();
    }, []);

    // Initialising socket obj
    useEffect(() => {
        const socket = io(SupportURI);

        if (loginStatus != "admin") {
            // For customer: join the chat using username (or other unique identifier)
            socket.emit("join-chat", username);

            // Listening for messages
            socket.on("support-chat", (msg) => {
                console.log(`New message from admin: ${msg}`);
            });

            socket.on("joined-chat", (message) => {
                console.log(message);
            });
        }
        else {

            socket.on("connect", () => {
                socket.emit("admin-join");
            });

            // Listen for active users list from the server
            socket.on("active-users", (users) => {
                setActiveUsers(users);
            });
        }

        // Setting state: To be shared between child components
        setSocket(socket);

        // During dismount: ensuring disconnection
        return () => {
            socket.disconnect();
        };
    }, [loginStatus])

    if (loginStatus != "admin"){
        return isMobile ? <SupportMobile username={username} socket={socket}/> : <SupportDesktop username={username} socket={socket}/>;
    }
    else {
        return isMobile ? <SupportMobileAdmin username={username} socket={socket}/> : <SupportDesktopAdmin username={username} socket={socket}/>;
    }
    
}
