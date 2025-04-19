import PurchaseButton from "@/components/regular-components/allUsers/buttons/purchase-btn"
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher"
import SupportMessageMobile from "@/components/regular-components/allUsers/support-page/message/mobile/support-message"
import SupportInputBarMobile from "../support-input-bar/support-input-bar-mobile"

export default function SupportMobile({ username, socket, messages, setMessages }) {
    return (
        <div className="flex flex-col h-[67vh] max-h-[67vh]">
            <NavBarSwitcher />

            <div className="flex flex-col flex-grow items-center m-3 min-w-[96vw] max-w-[96vw]">
                {/* Container with fixed message area height */}
                <div className="flex flex-col h-[65vh]">
                    {/* Message area */}
                    <div className="overflow-auto max-h-[65vh] min-h-[65vh]">
                        {[...messages].reverse().map((msgObj, index) => (
                            <SupportMessageMobile
                                key={index}
                                username={msgObj.username}
                                message={msgObj.msg}
                            />
                        ))}
                    </div>

                    {/* Sticky input bar */}
                    <div className="sticky bottom-0 p-2">
                        <SupportInputBarMobile
                            socket={socket}
                            username={username}
                            setMessages={setMessages}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
