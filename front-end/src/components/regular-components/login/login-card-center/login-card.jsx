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
    marginTop = "mt-10"
}) {

    return (
        <form 
            className={`text-black ${width} ${minWidth} ${maxWidth} ${height} ${minHeight} ${maxHeight} ${marginTop} md:${marginSides} flex items-center justify-center p-5 rounded-lg shadow-lg`}
            style={{ backgroundColor: color }}  
        >
            <div className="text-center space-y-4">
                <p className="text-2xl font-semibold">Login</p>
                <input 
                    type="text" 
                    placeholder="Username" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                />
                <LoginBtnRow />
            </div>
        </form>
    );
}
