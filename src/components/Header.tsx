"use client"
import { useSidebar } from "@/app/contexts/SidebarContext";
import { faBell, faMoon, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    const { toggleSidebar } = useSidebar()

    return (
        <>
            <div className="p-4 flex items-center justify-between border-b-1 border-[var(--main-scroll-color)]">
                <div className="left">
                    <div
                        onClick={toggleSidebar}
                        className="icon w-4 h-4 p-4 flex items-center justify-center rounded-lg bg-[var(--main-color)] text-[var(--text-in-background-color)] cursor-pointer hover:bg-[var(--text-in-background-color)] hover:text-[var(--main-color)] transition-all duration-200 ease-in-out">
                        <FontAwesomeIcon icon={faList} className="text-base" />
                    </div>
                </div>
                <div className="right text-[var(--main-color)] flex items-center gap-5">
                    <div className="item cursor-pointer">
                        <FontAwesomeIcon icon={faBell} className="text-2xl" />
                    </div>
                    <div className="item cursor-pointer">
                        <FontAwesomeIcon icon={faMoon} className="text-2xl" />
                    </div>
                    <div className="item cursor-pointer">
                        <FontAwesomeIcon icon={faUser} className="text-2xl" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;