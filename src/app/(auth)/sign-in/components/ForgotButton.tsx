"use client";

import Button from "@/components/Button";

interface ForgotButtonProps {
    label: string;
    className?: string;
}

const ForgotButton = ({ label, className }: ForgotButtonProps) => {
    return (
        <Button
            label={label}
            type="white-link"
            action={() => alert("Forgot password clicked")}
        />
    )
}

export default ForgotButton;