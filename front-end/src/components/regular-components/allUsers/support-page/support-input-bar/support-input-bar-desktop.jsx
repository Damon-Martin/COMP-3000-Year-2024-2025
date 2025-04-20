"use client"

import { useState, useEffect } from "react";

export default function SupportInputBarDesktop({ username, widthVW, socket, setMessages }) {
const [msgToSend, setMsgToSend] = useState('');

    const sendMessage = () => {
        // Message is not empty
        if (msgToSend.trim()) {
            const msgObjToSend = { username: username, msg: msgToSend}
            setMessages((prevMessages) => [...prevMessages, msgObjToSend]); // Appends message to be rendered
            socket.emit("support-chat", msgObjToSend) // Sends message
            setMsgToSend(""); // Clears input
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div
            className="flex m-1 shadow-sm"
            style={{ width: `${widthVW}vw` }}
        >
            <input
                type="text"
                value={msgToSend}
                onChange={(e) => setMsgToSend(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-black flex-grow p-2 outline-none border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 rounded-l-md transition duration-200 hover:bg-gray-100"
                placeholder="Enter Message..."
                aria-label="Enter Message"
            />
            <button
                onClick={sendMessage}
                className="bg-[#FF4D00] hover:bg-[#c21300] px-4 py-2 text-white border border-gray-300 border-l-0 rounded-r-md rounded-l-none focus:bg-[#c21300] focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition duration-200"
                aria-label="Send Button"
                onKeyDown={handleKeyDown}
            >
                Send
            </button>
        </div>
    );    
}