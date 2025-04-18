import PurchaseButton from "@/components/regular-components/allUsers/buttons/purchase-btn"
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher"
import SupportInputBarDesktop from "../support-input-bar/support-input-bar"
import SupportMessageDesktop from "@/components/regular-components/allUsers/support-page/message/desktop/support-message"
import SupportMessageMobile from "@/components/regular-components/allUsers/support-page/message/mobile/support-message"

export default function SupportMobile({ username, socket, messages, setMessages }) {

    return (
        <div>
            <NavBarSwitcher />
            <div className="flex justify-center">
                <div className="flex flex-col justify-between m-3 min-h-[70vh] max-h-[70vh] min-w-[96vw] max-w-[96vw]">
                    <div className="flex flex-col overflow-auto min-h-[64vh] max-h-[64vh] min-w-[96vw] max-w-[96vw]">
                        {/* render messages: In reverse order to display most recent at top */}
                        {[...messages].reverse().map((msgObj, index) => (
                            <SupportMessageMobile
                                key={index}
                                username={msgObj.username}
                                message={msgObj.msg}
                            />
                        ))}
                    </div>
                    {/* Support Form Input here*/}
                    <SupportInputBarDesktop socket={socket} username={username} setMessages={setMessages}/>
                </div>
            </div>
        </div>
    )
}