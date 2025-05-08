"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

type NavDocumentItem = {
    title: string;
    url: string;
    icon: IconProp;
};

type NavDocumentProps = {
    title: string;
    items: NavDocumentItem[];
}

const NavDocuments = ({ items, title }: NavDocumentProps) => {
    return (
        <div className="my-2 w-full">
            <div className="title w-full text-gray-600 font-bold">
                <h1 className="text-base font-bold mb-1">{title}</h1>
            </div>
            <div className="items">
                {items.map((item, index) => (
                    <Link key={index} href={item.url} className="w-full flex items-center text-[var(--text-color)] px-3 py-2 my-1 hover:bg-[var(--main-color)] hover:text-[var(--text-in-background-color)] transition duration-200 group cursor-pointer rounded-lg">
                        <div className="left flex justify-center items-center mr-2 w-4 group-hover:[transform:rotateY(360deg)] transition duration-300">
                            <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <div className="right">
                            <p className="text-sm font-bold">{item.title}</p>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    );
}

export default NavDocuments;

