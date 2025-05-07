"use client";
import { createContext, useContext, useState, ReactNode, useRef, PropsWithChildren } from "react";
import { v4 as uuidv4 } from "uuid";

interface Alert {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
}

interface AlertContextType {
    alerts: Alert[];
    showAlert: (type: Alert["type"], message: string) => void;
    closeAlert: (id: string) => void;
}

type AlertProviderProps = PropsWithChildren<{}>;

const AlertContext = createContext<AlertContextType | undefined>(undefined);


export const AlertProvider = ({ children }: AlertProviderProps) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const showAlert = (type: Alert["type"], message: string) => {
        const alreadyExists = alerts.some(
            (alert) => alert.type === type && alert.message === message
        );
        if (alreadyExists) return;

        const id = uuidv4();
        const newAlert: Alert = { id, type, message };
        setAlerts((prev) => [...prev, newAlert]);

        setTimeout(() => {
            setAlerts((prev) => prev.filter((a) => a.id !== id));
        }, 3000);
    };

    const closeAlert = (id: string) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <AlertContext.Provider value={{ alerts, showAlert, closeAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) throw new Error("useAlert must be used within AlertProvider");
    return context;
};
