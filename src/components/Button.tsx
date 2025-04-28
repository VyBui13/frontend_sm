"use client";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
    label: string;
    icon?: IconProp;
    className?: string;
    type?: string;
    action: () => void;
}

function domainToClassName(domain: string): string {
    switch (domain) {
        case "primary":
            return "bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded";
        case "success":
            return "bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded";
        case "secondary":
            return "bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 rounded";
        case "danger":
            return "bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded";
        case "warning":
            return "bg-yellow-500 hover:bg-yellow-700 text-white font-bold p-2 rounded";
        case "white-link":
            return "bg-tranparent hover:border-b-2 hover:border-white text-white font-bold px-2";
        case "black-link":
            return "bg-tranparent hover:border-b-2 hover:border-black text-black font-bold px-2";
        default:
            return "bg-black hover:bg-gray-400 text-white font-bold p-2 rounded";
    }
}

const Button = ({ label, icon, className, type, action }: ButtonProps) => {
    const buttonClass = domainToClassName(type || "") + " " + className;

    return (
        <>
            <button
                onClick={action}
                className={`${buttonClass} cursor-pointer transtion duration-200 flex justify-center items-center shadow-lg`}>
                {icon && <FontAwesomeIcon icon={icon} className="px-2" />}
                {label}
            </button>
        </>
    );
}

export default Button;