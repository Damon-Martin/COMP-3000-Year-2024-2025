import SupportButton from "@/components/regular-components/allUsers/all-pages/support-btn/support-btn";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";


const isProd = process.env.NEXT_PUBLIC_PRODUCTION === "true";
const AuthURI = isProd
    ? process.env.NEXT_PUBLIC_AUTH_URI_PROD
    : process.env.NEXT_PUBLIC_AUTH_SERVER_URI;
const BackendURI = isProd
    ? process.env.NEXT_PUBLIC_BACKEND_URI_PROD
    : process.env.NEXT_PUBLIC_BACKEND_URI;

export default function ViewDetailsDesktop({ email }) {
    const [UserData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (email && email != "") {
                const token = localStorage.getItem("token");
                const rawRes = await fetch(`${BackendURI}/v1/user-details?email=${email}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });

                if (rawRes.ok) {
                    const data = await rawRes.json();
                    setUserData(data.user);
                    console.log(data.user);
                }
                // Redirect to login if the user details is not found
                else {
                    router.push("/login");
                }
            }
            console.log(`Email is ${email}`);
        }
        fetchUserDetails();
        
    }, [email]);

    return (
        <div className="max-w-screen max-h-screen">
            <NavBarSwitcher />
            <main>
                {JSON.stringify(UserData)}
            </main>
            <SupportButton />
        </div>
    )
}