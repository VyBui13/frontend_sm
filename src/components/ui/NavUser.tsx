import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface NavUserProps {
    name: string;
    email: string;
}

const NavUser = ({ name, email }: NavUserProps) => {
    return (
        <>
            <div className="w-full flex p-2 justify-between items-center ">
                <div className="avatar bg-gray-500 w-4 h-4 bg-gray-200 p-4 rounded-lg mr-2 flex justify-center items-center">
                    <FontAwesomeIcon icon={faUser} className="text-white" />
                </div>
                <div className="detail flex-1">
                    <h1 className="text-sm font-bold text-black">{name}</h1>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>

                <div className="button flex justify-center items-center w-4 h-4 p-4 rounded-lg cursor-pointer">
                    <FontAwesomeIcon icon={faEllipsisVertical} className="text-black" />
                </div>
            </div>
        </>
    )
}

export default NavUser;