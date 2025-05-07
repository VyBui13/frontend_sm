"use client";
import { createContext, useState, useContext, PropsWithChildren } from 'react';

type ConfirmPromptData = {
    title: string;
    message?: string;
    actionLabel: string;
    action: () => Promise<void>;
};

type ConfirmPromptContextType = {
    confirmPromptData: ConfirmPromptData | null;
    showConfirmPrompt: (data: ConfirmPromptData) => void;
    hideConfirmPrompt: () => void;
};

const ConfirmPromptContext = createContext<ConfirmPromptContextType | undefined>(undefined);

type ConfirmPromptProviderProps = PropsWithChildren<{}>;

export const ConfirmPromptProvider = ({ children }: ConfirmPromptProviderProps) => {
    const [confirmPromptData, setConfirmPromptData] = useState<ConfirmPromptData | null>(null);

    const showConfirmPrompt = (data: ConfirmPromptData) => {
        setConfirmPromptData(data);
    }

    const hideConfirmPrompt = () => {
        setConfirmPromptData(null);
    };

    return (
        <ConfirmPromptContext.Provider value={{ confirmPromptData, showConfirmPrompt, hideConfirmPrompt }}>
            {children}
        </ConfirmPromptContext.Provider>
    );
};

export const useConfirmPrompt = (): ConfirmPromptContextType => {
    const context = useContext(ConfirmPromptContext);
    if (!context) {
        throw new Error('useConfirmPrompt must be used within a ConfirmPromptProvider');
    }
    return context;
};
