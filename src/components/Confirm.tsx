import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
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
            className="w-100 rounded-lg bg-[var(--text-in-background-color)] shadow-[var(--shadow)] flex flex-col justify-center items-center relative overflow-hidden">
            <div className="top p-6 flex justify-center items-center w-full bg-[var(--main-color)] text-[var(--text-in-background-color)]">
                <div className="icon flex justify-center items-center ">
                    <FontAwesomeIcon
                        style={{ animation: 'swing 0.3s infinite' }}
                        icon={faBell}
                        className="text-[var(--text-in-background-color)] text-4xl" />
                    <h1
                        className="text-2xl font-bold text-[var(--text-in-background-color)] ml-4 uppercase"
                    >Warning warning</h1>
                </div>
            </div>
            <div className="bottom p-4">

                <div className="w-full flex flex-col items-center justify-center mb-2">
                    <h3 className="text-2xl font-extrabold">Hang On A Second!</h3>
                    <p className="text-base font-semibold">{actionLabel} {title}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p
                        className="text-sm font-semibold text-center"
                    >{message ? message : 'Before doing something, make sure everything is exactly as you want it.'}</p>
                    <div className="flex w-full items-center justify-end gap-2 mt-4">
                        <Button label="Cancel" action={actionClose} type="danger" />
                        <Button label={actionLabel} action={async () => {
                            await action();
                            actionClose();
                        }} type="success" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Confirm;
