import SignInForm from "./components/SignInForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import ForgotButton from "./components/ForgotButton";
import Image from "next/image";

const SignIn = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen w-screen bg-white text-white">
                <div className="flex flex-row justify-center items-center bg-black rounded-lg overflow-hidden">
                    <div className="left px-8 py-8 w-90">
                        <div className="header flex justify-between items-center">
                            <div className="left">
                                <h1 className="text-2xl font-black uppercase">
                                    Sign In
                                </h1>
                                <p className="text-sm font-semibold">
                                    Sign in to your account
                                </p>
                            </div>
                            <div className="right">
                                <div className="flex justify-center items-center w-10 h-10 bg-white rounded-full">
                                    <FontAwesomeIcon icon={faLocation} className="text-black" />
                                </div>
                            </div>
                        </div>

                        <div className="body w-full my-4">
                            <SignInForm />
                        </div>

                        <div className="footer w-full flex justify-between items-center my-4">
                            <div className="item flex items-center w-full justify-center gap-1">
                                <p>Forgot your password?</p>
                                <ForgotButton label="click here" className="border-none hover:bg-transparent" />
                            </div>
                        </div>
                    </div>

                    <div className="right w-80">
                        <div className="image h-90">
                            <Image
                                src="/signin.jpg"
                                alt="Sign In"
                                width={350}
                                height={350}
                                objectFit="cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;