import LoginBtnRow from "../login-button-row/login-btn-row";

// Mobile no margin sides but desktop does
export default function LoginCard({ 
    color = "#D9D9D9",  
    width = "w-full",  
    minWidth = "min-w-80",  
    maxWidth = "max-w-xl",  
    height = "h-full",  
    minHeight = "min-h-80",
    maxHeight = "max-h-[800px]",
    marginSides = "mx-10",  
    marginTop = "mt-10"}) {



    return (
        <form 
            className={`text-black ${width} ${minWidth} ${maxWidth} ${height} ${minHeight} ${maxHeight} ${marginTop} md:${marginSides}`}
            style={{ backgroundColor: color }}  
        >
            <p>Login</p>
            <input type="text" placeholder="username"></input>
            <input type="password" placeholder="password"></input>
            <LoginBtnRow />
        </form>
    );
}

