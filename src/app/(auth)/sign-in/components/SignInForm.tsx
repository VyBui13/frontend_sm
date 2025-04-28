"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { redirect } from "next/navigation";

const SignInForm = () => {

    const handleSignIn = () => {
        redirect("/");
    };

    return (
        <>
            <div className="container w-full flex flex-col justify-center items-center">
                <div className="input-field w-full mb-2">
                    <div className="item w-full flex items-stretch my-2">
                        <div className="item-left w-4 h-4 p-4 flex justify-center items-center rounded-lg border-2 mr-4">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="item-right flex-1">
                            <input className="outline-none w-full h-full border-b-2" type="text" placeholder="Username or email" />
                        </div>
                    </div>

                    <div className="item w-full flex items-stretch my-2">
                        <div className="item-left w-4 h-4 p-4 flex justify-center items-center rounded-lg border-2 mr-4">
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <div className="item-right flex-1">
                            <input className="outline-none w-full h-full border-b-2" type="text" placeholder="Password" />
                        </div>
                    </div>

                </div>

                <div className="button-field w-full flex justify-end items-center">
                    <Button
                        label="Sign In"
                        action={handleSignIn}
                    />
                </div>
            </div>
        </>
    )
}

export default SignInForm;