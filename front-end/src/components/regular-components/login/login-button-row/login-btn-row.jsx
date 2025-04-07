import React, { useState } from 'react';

export default function LoginBtnRow() {
    const [hovered, setHovered] = useState({
        register: false,
        login: false
    });

    const buttonStyle = {
        padding: '10px 20px',
        margin: '5px',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    };

    // Base colors for the buttons
    const registerBaseColor = '#FFA500'; // Register login
    const loginBaseColor = '#FF4D00'; // Darker Orange for Login

    // Hover colors
    const registerHoverColor = '#FF7F00';
    const loginHoverColor = '#FF3B00';

    // Conditional styles based on hover state
    const registerStyle = {
        ...buttonStyle,
        backgroundColor: hovered.register ? registerHoverColor : registerBaseColor,
    };

    const loginStyle = {
        ...buttonStyle,
        backgroundColor: hovered.login ? loginHoverColor : loginBaseColor,
    };

    return (
        <div>
            <button
                style={registerStyle}
                onMouseEnter={() => setHovered({ ...hovered, register: true })}
                onMouseLeave={() => setHovered({ ...hovered, register: false })}
            >
                Register
            </button>
            <button
                style={loginStyle}
                onMouseEnter={() => setHovered({ ...hovered, login: true })}
                onMouseLeave={() => setHovered({ ...hovered, login: false })}
                type="submit"
            >
                Login
            </button>
        </div>
    );
}
