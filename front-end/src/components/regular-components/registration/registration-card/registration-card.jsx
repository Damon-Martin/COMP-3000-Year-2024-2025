export default function RegistrationCard({ width = "60vw", height = "auto", margin = "20px" }) {
    return (
        <form
            style={{
                width: width,
                height: height,
                margin: margin,
                backgroundColor: "#D9D9D9",
                borderRadius: "0.375rem",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
                padding: "2rem",
            }}
            className="flex flex-col justify-center items-center text-black space-y-2"
        >
            <h2 className="text-2xl font-semibold mb-2 text-center">Registration</h2>
            
            {/* Input Fields */}
            <input 
                type="text" 
                placeholder="Username" 
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 hover:bg-gray-100 focus:ring-orange-600 mb-2"
            />
            <input 
                type="password" 
                placeholder="Password" 
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 hover:bg-gray-100 focus:ring-orange-600 mb-2"
            />
            <input 
                type="text" 
                placeholder="First Name" 
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 hover:bg-gray-100 focus:ring-orange-600 mb-2" 
            />
            <input 
                type="text" 
                placeholder="Last Name" 
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 hover:bg-gray-100 focus:ring-orange-600 mb-2" 
            />
            <input 
                type="text" 
                placeholder="Telephone Number" 
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 hover:bg-gray-100 focus:ring-orange-600 mb-2" 
            />
            <input 
                type="text" 
                placeholder="Address" 
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 hover:bg-gray-100 focus:ring-orange-600 mb-2" 
            />
            <input 
                type="text" 
                placeholder="Post Code" 
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 hover:bg-gray-100 focus:ring-orange-600 mb-2" 
            />

            {/* Submit Button */}
            <button 
                type="submit" 
                className="w-full py-2 mt-4 bg-[#FF4D00] text-white font-semibold rounded-md hover:bg-[#c21300] focus:outline-none focus:ring-2 ring-orange-600"
            >
                Register
            </button>
        </form>
    );
}