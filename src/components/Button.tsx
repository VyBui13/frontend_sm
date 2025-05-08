"use client";

import { typeSelector } from "@/utils/TypeSelector";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";

interface ButtonProps {
    label?: string;
    icon?: IconProp;
    className?: string;
    type?: string;
    action: () => void;
}

const Button = ({ label, icon, className, type, action }: ButtonProps) => {
    const buttonClass = useMemo(() => typeSelector(type || ''), [type]) + " " + className;
    const isIconOnly = useMemo(() => {
        return !label && icon ? "w-4 h-4 p-4" : "py-1 px-2";
    }, [label, icon]);

    return (
        <>
            <button
                onClick={action}
                className={`flex items-center justify-center font-bold rounded cursor-pointer transtion duration-200 flex justify-center items-center ${isIconOnly} ${buttonClass}`}>
                <div
                    className="flex items-center justify-center gap-2">
                    {icon && <FontAwesomeIcon icon={icon} />}
                    {label && <p>{label}</p>}
                </div>
            </button>
        </>
    );
}

export default Button;