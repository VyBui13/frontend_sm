"use client"

import Button from "@/components/Button";
import { useState } from "react";

interface ConfirmPasswordProps {
    action: (value: string) => void;
    actionClose: () => void;
}

const ConfirmPassword = ({ action, actionClose }: ConfirmPasswordProps) => {
    const [password, setPassword] = useState<string>("");

    const handleChange = () => {
        action(password);
        actionClose();
    }
    return (
        <>
            <div className="virtual-background front-side">
                <div className="flex items-center justify-center p-4 gap-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <input
                        type="password"
                        id="confirmPassword"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className="bg-tranparent border border-gray-300 text-black text-sm rounded w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Confirm Password"
                        required />
                    <Button
                        label="Confirm"
                        type="black"
                        action={handleChange}
                    />
                </div>
            </div>
        </>
    )
}

export default ConfirmPassword;