"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { redirect } from "next/navigation";
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
        <div className="my-4 w-full">
            <div className="title w-full text-black font-bold">
                <h1 className="text-base font-bold text-black mb-2">{title}</h1>
            </div>
            <div className="items">
                {items.map((item, index) => (
                    <Link key={index} href={item.url} className="w-full flex items-center px-2 my-1 hover:bg-gray-200 cursor-pointer rounded-lg">
                        <div className="left flex justify-center items-center mr-2 w-10">
                            <FontAwesomeIcon icon={item.icon} className="text-black" />
                        </div>
                        <div className="right">
                            <p className="text-sm font-bold text-black">{item.title}</p>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    );
}

export default NavDocuments;

