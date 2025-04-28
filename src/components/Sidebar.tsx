import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faHouse, faList, faGear, faQuestion } from "@fortawesome/free-solid-svg-icons";
import NavDocuments from "./ui/NavDocuments";
import NavUser from "./ui/NavUser";

const sidebarItem =
{
    home: [
        {
            title: "Dashboard",
            url: "/",
            icon: faHouse,
        }
    ],
    management: [
        {
            title: "Student",
            url: "/student",
            icon: faList,
        },
        {
            title: "Class",
            url: "/class",
            icon: faList,
        },
    ],
    tool: [
        {
            title: "Grade",
            url: "/grade",
            icon: faGraduationCap,
        }
    ],
    other: [
        {
            title: "Settings",
            url: "/",
            icon: faGear,
        },
        {
            title: "Help",
            url: "/",
            icon: faQuestion,
        },
    ]
}

const User = {

    name: "Administrator",
    email: "administrator@gmail.com"
}

const Sidebar = () => {
    return (
        <>
            <div className="sidebar relative h-full w-full p-4">
                <div className="header flex items-center">
                    <div className="left flex justify-center items-center bg-black p-4 w-4 h-4 rounded-lg mr-2">
                        <FontAwesomeIcon icon={faGraduationCap} className="text-white" />
                    </div>
                    <div className="right">
                        <h1 className="text-xl font-bold text-black">
                            Administrators
                        </h1>
                    </div>
                </div>

                <div className="body my-4">
                    <NavDocuments title="Home" items={sidebarItem.home} />
                    <NavDocuments title="Management" items={sidebarItem.management} />
                    <NavDocuments title="Tool" items={sidebarItem.tool} />
                    <NavDocuments title="Other" items={sidebarItem.other} />
                </div>

                <div className="footer w-full absolute bottom-0 left-0 flex justify-center items-cente">
                    <NavUser name={User.name} email={User.email} />
                </div>
            </div>
        </>
    )
}

export default Sidebar;