"use client";

import { useAlert } from "@/app/contexts/AlertContext";
import Button from "@/components/Button";

interface ForgotButtonProps {
    label: string;
    className?: string;
}

const ForgotButton = ({ label, className }: ForgotButtonProps) => {
    const { showAlert } = useAlert()
    const handleForgotPassword = () => {
        showAlert("info", "Forgot password functionality is not implemented yet.")
    };

    return (
        <Button
            label={label}
            type="white-link"
            action={handleForgotPassword}
        />
    )
}

export default ForgotButton;