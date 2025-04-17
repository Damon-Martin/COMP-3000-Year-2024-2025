"use client";

import SupportMobile from "@/components/page-components/allUsers/support-page/mobile/support-mobile";
import SupportDesktop from "@/components/page-components/allUsers/support-page/desktop/support-desktop";

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
    const [activeUsers, setActiveUsers] = useState({}) // Admin only
    const [isMobile, setIsMobile] = useState(false);
    const [socket, setSocket] = useState(null);

    const [ messages, setMessages ] = useState([]) // Queue: push() and shift()

    // Determines to render desktop or mobile components
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
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
                        setUsername(`Admin`)
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
            } 
            catch (e) {
                console.error("JWT Checker Fetch Failed: ", e);
            }
        };

        isUserLoggedIn();
    }, []);

    // Initialising socket obj
    useEffect(() => {
        const socket = io(SupportURI);

        const handleIncomingMessage = (msgReceived) => {
            console.log(JSON.stringify(msgReceived));
            if (msgReceived.username && msgReceived.msg) {
              // append to list of messages that auto renders
              setMessages((prevMessages) => [...prevMessages, msgReceived]);
              console.log(msgReceived);
            }
        };

        socket.on('support-chat', handleIncomingMessage);

        // Setting state: To be shared between child components
        setSocket(socket);

        // During dismount: ensuring disconnection
        return () => {
            socket.disconnect();
        };
    }, [])


    return isMobile ? <SupportMobile username={username} socket={socket} messages={messages} setMessages={setMessages}/> : <SupportDesktop username={username} socket={socket} messages={messages} setMessages={setMessages}/>;
    
    
}
