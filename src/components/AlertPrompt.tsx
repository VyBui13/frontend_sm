"use client";
import { useAlert } from "@/app/contexts/AlertContext";
import Alert from "./Alert";

const AlertPrompt = () => {
    const { alerts, closeAlert } = useAlert();

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
                className="flex flex-col gap-2 z-50">

                {alerts.slice().reverse().map((alert) => (
                    <Alert
                        key={alert.id}
                        type={alert.type}
                        message={alert.message}
                        onClose={() => closeAlert(alert.id)}
                    />
                ))}
            </div>
        </>
    );
};

export default AlertPrompt;
