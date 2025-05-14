"use client";
import { useConfirmPrompt } from "@/app/contexts/ConfirmContext";
import Confirm from "./Confirm";

const ConfirmPrompt = () => {
    const { confirmPromptData, hideConfirmPrompt } = useConfirmPrompt();
    return (
        <>
            <div className="div">
                {confirmPromptData && <div className="virtual-background front-side">
                    <div

                        style={{
                            position: 'fixed',
                            top: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 50,
                        }}
                        className="div">

                        <Confirm
                            title={confirmPromptData.title}
                            message={confirmPromptData.message}
                            actionLabel={confirmPromptData.actionLabel}
                            action={confirmPromptData.action}
                            actionClose={hideConfirmPrompt} />
                    </div>
                </div>}
            </div>
        </>
    );
}

export default ConfirmPrompt;