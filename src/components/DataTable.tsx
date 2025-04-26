"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faArrowLeft, faArrowRight, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface DataTableProps<T = any> {
    headers: (keyof T)[];
    data: T[];
    proportions: number[]; // phần trăm cho mỗi cột
    numOfRows: number;
    heightRow: number;
    action: (item: T) => void;
}

const DataTable = <T extends object>({ headers, data, proportions, numOfRows, heightRow, action }: DataTableProps<T>) => {
    const [page, setPage] = useState(1);

    const increasePage = () => {
        if (page < Math.ceil(data.length / numOfRows)) {
            setPage(page + 1);
        }
    };

    const decreasePage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="w-full flex flex-col border rounded-md border-2 border-black overflow-hidden">
            {/* Header */}
            <div className="flex bg-black text-white">
                {headers.map((header, index) => (
                    <div
                        key={index}
                        style={{
                            flex: `${proportions[index]}`
                        }}
                        className={`flex items-center justify-center p-2 font-bold`}
                    >
                        {header.toString().toUpperCase()}
                    </div>
                ))}
                <div
                    style={{
                        flex: 1,
                    }}
                    className="flex items-center justify-center p-2 font-bold">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
            </div>

            {/* Body */}
            <div
                style={{
                    height: `calc(${heightRow}px * ${numOfRows})`,
                }}
                className="flex flex-col">
                {data.slice((page - 1) * numOfRows, page * numOfRows).map((item, rowIndex) => (
                    <div
                        style={{
                            height: `${heightRow}px`,
                        }}
                        key={rowIndex}
                        className="flex border-b hover:bg-gray-100 transition">
                        {headers.map((header, colIndex) => (
                            <div
                                key={colIndex}
                                style={{
                                    flex: `${proportions[colIndex]}`
                                }}
                                className={`flex items-center justify-center p-2 font-bold`}
                            >
                                {String(item[header])}
                            </div>
                        ))}
                        <div
                            style={{
                                flex: 1,
                            }}
                            className="flex items-center justify-center p-2">
                            <button
                                onClick={() => action(item)}
                                className="flex items-center justify-center text-blue-500 w-4 h-4 p-4 rounded-lg bg-black cursor-pointer hover:bg-white transition duration-200"
                            >
                                <FontAwesomeIcon icon={faPen} className="text-white text-xs hover:text-black" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 bg-black text-white">
                <div className="left p-2 flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faHashtag} className="text-white" />
                    <span>{data.length} item(s)</span>
                </div>

                <div className="right p-2 flex items-center justify-center gap-2">
                    <span className="text-white">{page} | {Math.ceil(data.length / numOfRows)}</span>

                    <div className="button flex items-center justify-center gap-1">

                        <button
                            onClick={decreasePage}
                            className="flex items-center justify-center text-blue-500 w-4 h-4 p-4 rounded-lg bg-black cursor-pointer hover:bg-white hover:text-black transition duration-200"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="text-white text-xs hover:text-black" />
                        </button>
                        <button
                            onClick={increasePage}
                            className="flex items-center justify-center text-blue-500 w-4 h-4 p-4 rounded-lg bg-black cursor-pointer hover:bg-white hover:text-black transition duration-200"
                        >
                            <FontAwesomeIcon icon={faArrowRight} className="text-white text-xs hover:text-black" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
