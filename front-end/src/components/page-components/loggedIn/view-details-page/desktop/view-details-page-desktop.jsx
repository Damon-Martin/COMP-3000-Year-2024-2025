import SupportButton from "@/components/regular-components/allUsers/all-pages/support-btn/support-btn";
import NavBarSwitcher from "@/components/regular-components/allUsers/nav-bar/nav-bar-switcher/nav-bar-switcher";
import { useRouter } from 'next/navigation';
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
            if (email && email !== "") {
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
                } else {
                    router.push("/login");
                }
            }
            console.log(`Email is ${email}`);
        };
        fetchUserDetails();
    }, [email]);

    return (
        <div className="max-w-screen max-h-[65vh] flex flex-col items-center justify-start pt-16">
            {/* NavBar */}
            <NavBarSwitcher />
            
            <main className="flex flex-1 items-center justify-center w-full">
                <div className="w-full max-w-md p-6 bg-[#d9d9d9] rounded-md shadow-md">
                    {UserData ? (
                        <div>
                            <h2 className="text-xl font-bold mb-4">User Details</h2>
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {UserData.fName} {UserData.lName}</p>
                                <p><strong>Email:</strong> {UserData.email}</p>
                                <p><strong>Phone:</strong> {UserData.tel}</p>
                                <p><strong>Address:</strong> {UserData.address}</p>
                                <p><strong>Postcode:</strong> {UserData.postcode}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
            </main>
            
            {/* Support Button */}
            <SupportButton />
        </div>
    );
}