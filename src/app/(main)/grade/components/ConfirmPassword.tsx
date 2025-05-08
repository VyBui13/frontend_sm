"use client"

import { useAlert } from "@/app/contexts/AlertContext"
import Button from "@/components/Button"
import { useState } from "react"
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons"

interface Token {
  username: string
  password: string
}
interface ConfirmPasswordProps {
  action: (value: Token) => void
  actionCancel: () => void
}

const ConfirmPassword = ({ action, actionCancel }: ConfirmPasswordProps) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { showAlert } = useAlert()

  const handleCancel = () => {
    actionCancel();
  }

  const handleChange = () => {
    if (password === "" || username === "") {
      showAlert("error", "Please fill in all fields")
      return;
    }
    action({
      username: username,
      password: password,
    })
    actionCancel();
  }

  return (
    <>
      <div className="virtual-background front-side">
        <div
          style={{
            animation: "zoomIn 0.3s ease-in-out",
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-[var(--text-in-background-color)] p-4 shadow-md dark:bg-gray-800">
          <input
            type="text"
            id="confirmUsername"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            className="bg-tranparent w-60 rounded border border-gray-300 p-2 text-sm text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Confirm Username"
            required
          />

          <input
            type="password"
            id="confirmPassword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="bg-tranparent w-60 rounded border border-gray-300 p-2 text-sm text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Confirm Password"
            required
          />
          <Button icon={faX} type="danger" action={handleCancel} />
          <Button icon={faCheck} type="success" action={handleChange} />
        </div>
      </div>
    </>
  )
}

export default ConfirmPassword
