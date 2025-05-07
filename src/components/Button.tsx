"use client";

import { typeSelector } from "@/utils/TypeSelector";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";

interface ButtonProps {
    label: string;
    icon?: IconProp;
    className?: string;
    type?: string;
    action: () => void;
}

const Button = ({ label, icon, className, type, action }: ButtonProps) => {
    const buttonClass = useMemo(() => typeSelector(type || ''), [type]) + " " + className;

    return (
        <>
            <button
                onClick={action}
                className={`${buttonClass} font-bold p-2 rounded cursor-pointer transtion duration-200 flex justify-center items-center shadow-lg`}>
                {icon && <FontAwesomeIcon icon={icon} className="px-2" />}
                {label}
            </button>
        </>
    );
}

export default Button;