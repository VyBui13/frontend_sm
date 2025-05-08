"use client";

import { createContext, useContext, useState, PropsWithChildren } from 'react';

type SidebarTypeContext = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
};

type SidebarProviderProps = PropsWithChildren<{}>;

const SidebarContext = createContext<SidebarTypeContext | undefined>(undefined);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    }

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSidebar must be used within SidebarProvider");
    return context;
};
