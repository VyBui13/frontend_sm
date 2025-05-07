"use client"
import { useRouter } from "next/navigation";
import { useStaff } from "../contexts/StaffContext";
import { useEffect } from "react";

const Page = () => {
    const { staff } = useStaff();
    if (!staff) return <></>;
    // const router = useRouter();

    // useEffect(() => {
    //     if (!staff) {
    //         router.push("/sign-in");
    //     }
    // }, [staff, router]);

    // if (!staff) {
    //     return null;
    // }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome, {staff.id}</h1>
            <p className="text-lg">You are logged in as {staff.fullname}</p>
        </div>
    )


}

export default Page;