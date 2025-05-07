"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStaff } from "../contexts/StaffContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { staff } = useStaff();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!staff) {
            router.push("/sign-in");
        } else {
            setLoading(false);
        }
    }, [staff, router]);

    if (!staff || loading) {
        return null; // hoặc spinner nếu muốn
    }

    return <>{children}</>;
}
