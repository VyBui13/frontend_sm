"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faExclamation, faInfo, faLocation } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";

interface AlertProps {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    onClose: () => void;
}

const matchIcon = (type: string) => {
    switch (type) {
        case 'success':
            return faCheck;
        case 'error':
            return faX
        case 'info':
            return faInfo
        case 'warning':
            return faExclamation
        default:
            return faLocation;
    }
}

const alertSelectorForContainer = (type: string) => {
    switch (type) {
        case 'success':
            return {
                backgroundColor: '#15301b',
                color: '#fff',
            };
        case 'error':
            return {
                backgroundColor: '#301716',
                color: '#fff',
            }
        case 'info':
            return {
                backgroundColor: '#0f2537',
                color: '#fff',
            }
        case 'warning':
            return {
                backgroundColor: '#37270f',
                color: '#fff',
            }
        default:
            return {
                backgroundColor: '#1f1f1f',
                color: '#fff',
            };
    }
}

const alertSelectorForIconContainer = (type: string) => {
    switch (type) {
        case 'success':
            return {
                backgroundColor: '#30d058',
                color: '#fff',
            };
        case 'error':
            return {
                backgroundColor: '#d63233',
                color: '#fff',
            }
        case 'info':
            return {
                backgroundColor: '#0190ff',
                color: '#fff',
            }
        case 'warning':
            return {
                backgroundColor: '#ff9f0a',
                color: '#fff',
            }
        default:
            return {
                backgroundColor: '#1f1f1f',
                color: '#fff',
            };
    }
}

const Alert = ({ type, message, onClose }: AlertProps) => {
    const icon = useMemo(() => matchIcon(type), [type]);
    const classNameForContainer = useMemo(() => alertSelectorForContainer(type), [type]);
    const classNameForIconContainer = useMemo(() => alertSelectorForIconContainer(type), [type]);

    return (
        <>
            <div
                style={{
                    zIndex: 100,
                    ...classNameForContainer,
                    animation: 'slideIn 0.3s ease-in-out forwards',
                }}
                className={`w-110 z-50 rounded-lg shadow-lg flex flex-col items-center overflow-hidden`}>
                <div className="container1 flex w-full items-center justify-between p-2 ">
                    <div
                        className="left flex items-center gap-2">
                        <div
                            style={classNameForIconContainer}
                            className={`flex items-center justify-center rounded-lg w-4 h-4 p-3 ${classNameForIconContainer}`}>
                            <FontAwesomeIcon icon={icon} className={`text-white text-sm font-semibold`} />
                        </div>

                        <span
                            style={classNameForContainer}
                            className={`text-sm font-semibold text-white`}>
                            {message}
                        </span>
                    </div>
                    <div className="right">
                        <button
                            onClick={onClose}
                            className={`flex items-center justify-center rounded-lg w-4 h-4 p-3 group cursor-pointer`}>
                            <FontAwesomeIcon
                                icon={faX}
                                className="text-gray-50 transition-transform duration-500 group-hover:rotate-[180deg]"
                            />
                        </button>
                    </div>
                </div>
                <div className="loadingbar w-full">
                    <div
                        className="w-full h-1 bg-gray-400 transition-all duration-[3000ms]"
                        style={{
                            animation: 'shrinkBar 3s ease-out forwards',
                        }}
                    ></div>
                </div>
            </div>
        </>
    )
}

export default Alert;
