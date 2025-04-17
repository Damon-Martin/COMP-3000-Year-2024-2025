
import Image from 'next/image'

import NavBarSwitcher from "@/components/regular-components/nav-bar/nav-bar-switcher/nav-bar-switcher";


export default function OrderFailureDesktop() {
    return (
        <div>
            <NavBarSwitcher />
            <main tabIndex={0} className='flex flex-col items-center justify-center text-center space-y-4 mt-4'>
                <Image 
                    src="/images/failure-icon/failure-icon.svg" 
                    alt="Failure Warning Image"
                    className="min-h-[25vh] max-h-[25vh]"
                    >
                </Image>
                <p className="text-3xl">Order Failure</p>
            </main>
        </div>
    )
}