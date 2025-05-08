"use client"

import DisplayTimer from "@/components/ui/DisplayTimer"
import { useEffect, useState } from "react"

interface AuthenticationDisplayProps {
    isAuthenticated: boolean
    seconds?: number
}

const AuthenticationDisplay = ({ isAuthenticated, seconds }: AuthenticationDisplayProps) => {

    const [animateOut, setAnimateOut] = useState(false);

    useEffect(() => {
        setAnimateOut(false);
        const timer = setTimeout(() => {
            setAnimateOut(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, [isAuthenticated]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateOut(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: "-5px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 30,
                }}
                className={`flex items-center justify-center gap-2 py-2 px-5 text-white text-base rounded-lg font-bold ${isAuthenticated ? "bg-green-700" : "bg-red-700"}`}>
                <h1>
                    {isAuthenticated ? "Authenticated" : "Unauthenticated"}
                </h1>
                {isAuthenticated && <DisplayTimer initialSeconds={seconds ? seconds : 0} />}
            </div>

            <style jsx>{`
            
      `}</style>
        </>
    )
}

export default AuthenticationDisplay;