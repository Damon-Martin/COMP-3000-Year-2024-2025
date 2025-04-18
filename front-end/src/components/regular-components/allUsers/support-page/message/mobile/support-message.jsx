
export default function SupportMessageMobile({ index, username = "username", message = "INSERT_MSG" }) {
    return (
        <div key={index} className="bg-[#D9D9D9] hover:bg-gray-100 text-black mt-4 w-[95vw] min-h-[15vh] rounded-md flex items-center">
            <div className="flex flex-col justify-center pl-4">
                <p>{username}</p>
                <p>{message}</p>
            </div>
        </div>
    )
}