"use client"
import Sidebar from "@/components/Sidebar"
import { useSidebar } from "../contexts/SidebarContext"

const SidebarReal = () => {
    const { isSidebarOpen } = useSidebar()

    return (
        <>
            <div
                style={{
                    width: isSidebarOpen ? "250px" : "0px",
                    transition: "width 0.3s ease-in-out",
                }}
                className="left-gap h-full border-r-2 bg-white"></div>
            <div
                style={{
                    width: isSidebarOpen ? "250px" : "0px",
                    transition: "width 0.3s ease-in-out",
                }}
                className="left fixed h-full border-r-3 border-[var(--main-color)] overflow-hidden">
                <Sidebar />
            </div>
        </>
    )
}

export default SidebarReal