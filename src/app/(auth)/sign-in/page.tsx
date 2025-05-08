import SignInForm from "./components/SignInForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faSchool } from "@fortawesome/free-solid-svg-icons";
import ForgotButton from "./components/ForgotButton";

const SignIn = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen w-screen bg-white overflow-hidden relative">
                <div
                    style={{
                        backgroundImage: "url('/background-sign-in.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(10px)",
                        transform: "scale(1.1)",
                    }}
                    className="absolute inset-0 z-0"
                ></div>

                <div className="relative z-10 flex flex-row justify-center items-stretch border-4 border-[var(--main-color)] bg-[var(--main-color)] rounded-lg overflow-hidden text-[var(--text-in-background-color)] shadow-[var(--shadow)]">
                    <div className="left px-8 py-8">
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
                                <div className="flex justify-center items-center w-10 h-10 bg-[var(--text-in-background-color)] rounded-full">
                                    <FontAwesomeIcon icon={faGraduationCap} className="text-[var(--main-color)]" />
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

                    <div
                        style={{
                            animation: "wideIn 1s ease-in-out forwards",
                        }}
                        className="right overflow-hidden flex justify-center items-center bg-[var(--main-color)] text-[var(--text-in-background-color)]">
                        <div
                            className="right h-full p-8 bg-[var(--text-in-background-color)] text-[var(--main-color)]  flex flex-col justify-center items-center">
                            <div className="header flex justify-center items-center">
                                <h1
                                    className="text-xl font-black uppercase text-center"
                                >lavendula school</h1>
                            </div>
                            <div className="body flex-1 flex justify-center items-center">
                                <FontAwesomeIcon icon={faSchool} className="text-[var(--main-color)] text-8xl" />
                            </div>
                            <div className="footer">
                                <p
                                    className="text-sm uppercase font-semibold text-center"
                                >student management system</p>
                                <p
                                    className="text-sm uppercase font-semibold text-center"
                                >2025 - 2026</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default SignIn;