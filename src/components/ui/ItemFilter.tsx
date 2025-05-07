"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

interface ItemFilterProps {
    title: string;
    data: string[];
    value: string;
    action: (value: string) => void;
}

const ItemFilter = ({ title, data, value, action }: ItemFilterProps) => {
    return (
        <div className="item flex items-center gap-2 p-2">
            <div className="left">
                <FontAwesomeIcon icon={faFilter} className="text-xl text-black" />
            </div>
            <div className="right">
                <select
                    value={value}
                    onChange={(e) => action(e.target.value)}
                    className="outline-none border-b-2 border-black w-25 cursor-pointer"
                >
                    <option value="" disabled>{title}</option>
                    {data.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                    <option value="">None</option>
                </select>
            </div>
        </div>
    );
}

export default ItemFilter;