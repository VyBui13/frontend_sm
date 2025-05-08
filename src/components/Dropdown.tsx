'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useMemo, useRef, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { typeSelector } from '@/utils/TypeSelector';

interface DropdownProps<T = any> {
    value: T;
    title: string;
    dataList: T[];
    actionChoose: (item?: T) => void;
    width?: number;
    type?: string;
    itemDisplay?: number;
    iconProp?: IconProp;
    isDropMenu?: boolean;
    className?: string;
}

// const domainTypeClassNameButton = (type: string) => {
//     switch (type) {
//         case 'primary':
//             return 'bg-blue-500 text-white hover:bg-blue-600';
//         case 'danger':
//             return 'text-green-500';
//         case 'boolean':
//             return 'text-red-500';
//         default:
//             return 'text-gray-500';
//     }
// }

const Dropdown = <T extends unknown>({
    title,
    value,
    dataList,
    actionChoose,
    width,
    type,
    itemDisplay,
    iconProp,
    isDropMenu,
    className,
}: DropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const itemHeight = 40;
    const maxHeight = itemHeight * (itemDisplay || 5);
    const domainClass = useMemo(() => typeSelector(type || ''), [type]);


    return (
        <div
            ref={dropdownRef}
            style={{
                width: width || '100px',
            }}
            className="relative"
        >
            <button
                className={`${domainClass} w-full flex justify-between items-center py-2 px-2 rounded cursor-pointer font-semibold transition duration-200 ${className}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div
                    style={{
                        justifyContent: !isDropMenu ? 'center' : 'flex-start',
                    }}
                    className="left w-full flex items-center gap-2">
                    {iconProp && <FontAwesomeIcon icon={iconProp} />}
                    <span>{value ? String(value) : title}</span>
                </div>
                <div className="right flex items-center justify-center">
                    {isDropMenu && (isDropMenu === true && <FontAwesomeIcon icon={faCaretDown} className={(isOpen ? 'transform rotate-90' : "") + " transition duration-200"} />)}
                </div>
            </button>

            {isOpen && (
                <div
                    className={`${domainClass} absolute z-10 border rounded mt-1 overflow-y-auto custom-scrollbar shadow-[var(--shadow)] ${className}`}
                    style={{ maxHeight, width }}
                >
                    {dataList.map((item, index) => (
                        <div
                            key={index}
                            className={`${domainClass} p-2 cursor-pointer hover:bg-gray-700 uppercase`}
                            onClick={() => {
                                actionChoose(item);
                                setIsOpen(false);
                            }}
                        >
                            {String(item)}
                        </div>
                    ))}
                    <div
                        onClick={() => {
                            actionChoose(undefined);
                            setIsOpen(false);
                        }}
                        className={`${domainClass} p-2 cursor-pointer`}>
                        None
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
