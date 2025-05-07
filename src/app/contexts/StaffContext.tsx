"use client";

import { Staff } from '@/types/Staff';
import { createContext, useContext, useState, PropsWithChildren } from 'react';

type StaffContextType = {
    staff: Staff | null;
    setStaff: (staff: Staff | null) => void;
};

type StaffProviderProps = PropsWithChildren<{}>;

const staffContext = createContext<StaffContextType | undefined>(undefined);


export const StaffProvider = ({ children }: StaffProviderProps) => {
    const [staff, setStaff] = useState<Staff | null>(null);

    return (
        <staffContext.Provider value={{ staff, setStaff }}>
            {children}
        </staffContext.Provider>
    );
};

export const useStaff = () => {
    const context = useContext(staffContext);
    if (!context) throw new Error("useStaff must be used within staffProvider");
    return context;
};
