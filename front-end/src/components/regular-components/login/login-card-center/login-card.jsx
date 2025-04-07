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
            className={`text-black ${width} ${minWidth} ${maxWidth} ${height} ${minHeight} ${maxHeight} ${marginTop} md:${marginSides} flex items-center justify-center`}
            style={{ backgroundColor: color }}  
        >
            <div className="text-center">  {/* Added this div to center text inside the form */}
                <p>Login</p>
                <input type="text" placeholder="username" className="m-1"></input> <br/>
                <input type="password" placeholder="password" className="m-1"></input>
                <LoginBtnRow />
            </div>
        </form>
    );
}
