"use client";

import { Button } from "@/components/ui/button";

interface ForgotButtonProps {
    label: string;
    className?: string;
}

const ForgotButton = ({ label, className }: ForgotButtonProps) => {
    return (
        <Button variant="link" className="text-white cursor-pointer">{label}</Button>
    )
}

export default ForgotButton;