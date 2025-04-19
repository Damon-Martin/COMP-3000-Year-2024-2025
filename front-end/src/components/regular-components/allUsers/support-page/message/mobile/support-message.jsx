
export default function SupportMessageMobile({ index, username = "username", message = "INSERT_MSG" }) {
    return (
        <div key={index} className="bg-[#D9D9D9] text-black mt-4 w-[95vw] rounded-md flex items-center mx-auto">
            <div className="flex flex-col justify-center pl-4">
                <p>{username}</p>
                <p>{message}</p>
            </div>
        </div>
    )
}