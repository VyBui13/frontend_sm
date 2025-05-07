import Button from "./Button";

interface ConfirmProps {
    title: string;
    message?: string;
    actionLabel: string;
    action: () => Promise<void>;
    actionClose: () => void;
}

const Confirm = ({ title, message, actionLabel, action, actionClose }: ConfirmProps) => {
    return (
        <div
            style={{
                animation: 'slideIn 0.3s ease-in-out',
            }}
            className="w-100 rounded-lg bg-white p-4 shadow-md">
            <div className="w-full flex flex-col items-center justify-center mb-4">
                <h3 className="text-2xl font-extrabold">Hang On A Second!</h3>
                <p className="text-base font-semibold">{title}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p
                    className="text-base font-semibold text-center"
                >{message ? message : 'Before doing something, make sure everything is exactly as you want it.'}</p>
                <div className="flex w-full items-center justify-end gap-2 mt-4">
                    <Button label="Cancel" action={actionClose} type="danger" />
                    <Button label="Confirm" action={async () => {
                        await action();
                        actionClose();
                    }} type="success" />
                </div>
            </div>
        </div>
    )
}

export default Confirm;
