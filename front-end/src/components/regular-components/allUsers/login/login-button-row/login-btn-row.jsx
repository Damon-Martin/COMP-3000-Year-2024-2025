"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function LoginBtnRow() {
    const [hovered, setHovered] = useState({
        register: false,
        login: false
    });

    const router = useRouter()

    const buttonStyle = {
        flex: 1, // Makes both buttons take equal width
        padding: '15px',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
        textAlign: 'center',
    };

    const registerBaseColor = '#FFA500';
    const loginBaseColor = '#FF4D00';

    const registerHoverColor = '#FF7F00';
    const loginHoverColor = '#c21300';

    const registerStyle = {
        ...buttonStyle,
        backgroundColor: hovered.register ? registerHoverColor : registerBaseColor,
    };

    const loginStyle = {
        ...buttonStyle,
        backgroundColor: hovered.login ? loginHoverColor : loginBaseColor,
    };

    return (
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <button
                style={registerStyle}
                aria-label='Link to Registration'
                title='Link to Registration'
                onMouseEnter={() => setHovered({ ...hovered, register: true })}
                onMouseLeave={() => setHovered({ ...hovered, register: false })}
                type="button"
                onClick={() => router.push("/registration")}
            >
                Register
            </button>
            <button
                style={loginStyle}
                aria-label='Login Button'
                title='Login Button'
                onMouseEnter={() => setHovered({ ...hovered, login: true })}
                onMouseLeave={() => setHovered({ ...hovered, login: false })}
                type="submit"
            >
                Login
            </button>
        </div>
    );
}