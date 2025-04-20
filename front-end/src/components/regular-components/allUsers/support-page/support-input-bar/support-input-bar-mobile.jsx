"use client"

import { useState } from "react";

export default function SupportInputBarMobile({ username, socket, setMessages }) {
    const [msgToSend, setMsgToSend] = useState('');

    const sendMessage = () => {
        if (msgToSend.trim()) {
            const msgObjToSend = { username: username, msg: msgToSend };
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
        <div className="flex m-2 shadow-md w-[96vw] max-w-[96vw]">
            <input
                type="text"
                value={msgToSend}
                onChange={(e) => setMsgToSend(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-black flex-grow px-4 py-3 text-base outline-none border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 rounded-l-lg transition duration-200 hover:bg-gray-100"
                placeholder="Enter your message..."
                aria-label="Enter Message"
            />
            <button
                onClick={sendMessage}
                className="bg-[#FF4D00] hover:bg-[#c21300] px-6 py-3 text-base font-semibold text-white border border-gray-300 border-l-0 rounded-r-lg focus:bg-[#c21300] focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition duration-200"
                aria-label="Send Button"
                onKeyDown={handleKeyDown}
            >
                Send
            </button>
        </div>
    );
}