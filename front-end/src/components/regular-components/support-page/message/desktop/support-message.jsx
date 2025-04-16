
export default function SupportMessageDesktop({ index, username = "username", message = "INSERT_MSG" }) {
    return (
        <div key={index} className="bg-[#D9D9D9] hover:bg-gray-100 text-black mt-4 min-w-[58.5vw] max-w-[58.5vw] min-h-[15vh] max-h-[15vh] rounded-md flex items-center">
            <div className="flex flex-col justify-center pl-4">
                <p>{username}</p>
                <p>{message}</p>
            </div>
        </div>
    )
}