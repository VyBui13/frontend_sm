"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import Button from "@/components/Button"
import { useState } from "react"
import { signIn } from "../../../services/staffApiService"
import { useStaff } from "@/app/contexts/StaffContext"
import { useRouter } from "next/navigation"
import { useAlert } from "@/app/contexts/AlertContext"

const SignInForm = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { setStaff } = useStaff()
  const router = useRouter()
  const { showAlert } = useAlert()

  const handleSignIn = async () => {
    if (username === "" || password === "") {
      showAlert("error", "Please fill in all fields");
      return
    }

    try {
      const response = await signIn(username, password)
      if (response.status === "success") {
        setStaff(response.data)
        showAlert("success", "Sign in successful")
        router.push("/")
        return
      }

      showAlert("error", response.message)

    }
    catch (error) {
      console.error("Error signing in:", error)
      showAlert("error", "Server is down, please try again later")
    }
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="input-field mb-2 w-full">
          <div className="item my-2 flex w-full items-stretch">
            <div className="item-left mr-4 flex h-4 w-4 items-center justify-center rounded-lg border-[var(--text-in-background-color)] border-2 p-4">
              <FontAwesomeIcon icon={faUser} className="text-[var(--text-in-background-color)]" />
            </div>
            <div className="item-right flex-1">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-full w-full border-b-2 border-b-[var(--text-in-background-color)] outline-none text-[var(--text-in-background-color)]"
                type="text"
                placeholder="Username or email"
              />
            </div>
          </div>

          <div className="item my-2 flex w-full items-stretch">
            <div className="item-left mr-4 flex h-4 w-4 items-center justify-center rounded-lg border-[var(--text-in-background-color)] border-2 p-4">
              <FontAwesomeIcon icon={faLock} className="text-[var(--text-in-background-color)]" />
            </div>
            <div className="item-right flex-1">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-full w-full border-b-2 border-b-[var(--text-in-background-color)] outline-none text-[var(--text-in-background-color)]"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        <div className="button-field flex w-full items-center justify-end">
          <Button
            label="Sign In"
            action={handleSignIn}
            className="text-[var(--main-color)] bg-[var(--text-in-background-color)] hover:bg-[var(--main-color)] hover:text-[var(--text-in-background-color)]"
          />
        </div>
      </div>
    </>
  )
}

export default SignInForm
