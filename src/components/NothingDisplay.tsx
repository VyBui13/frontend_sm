import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

interface NothingDisplayProps {
    title?: string;
    description?: string;
}

const NothingDisplay = ({ title, description }: NothingDisplayProps) => {
    const displayDescription = description || "It seems that nothing to display right now!";
    const displayTitle = title || "Nothing to display!";

    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <div className="container flex items-center justify-center gap-4">
                <div className="left flex items-center justify-center w-7 h-7 p-6 rounded-full bg-black">
                    <FontAwesomeIcon icon={faBell} className="text-xl text-white" />
                </div>

                <div className="right flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-black">{displayTitle}</h1>
                    <p className="text-gray-500">{displayDescription}</p>
                </div>
            </div>
        </div>
    );
}

export default NothingDisplay;