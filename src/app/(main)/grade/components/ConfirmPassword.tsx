"use client"

import { useAlert } from "@/app/contexts/AlertContext"
import Button from "@/components/Button"
import { useState } from "react"

interface ConfirmPasswordProps {
  action: (value: string) => void
  actionClose: () => void
  actionCancel: () => void
}

const ConfirmPassword = ({ action, actionClose, actionCancel }: ConfirmPasswordProps) => {
  const [password, setPassword] = useState<string>("")
  const { showAlert } = useAlert()

  const handleCancel = () => {
    actionCancel();
  }

  const handleChange = () => {
    if (password === "") {
      showAlert("error", "Please fill in all fields")
      return;
    }
    action(password)
    actionClose()
  }

  return (
    <>
      <div className="virtual-background front-side">
        <div className="flex items-center justify-center gap-2 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
          <input
            type="password"
            id="confirmPassword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="bg-tranparent w-60 rounded border border-gray-300 p-2.5 text-sm text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Confirm Password"
            required
          />
          <Button label="Cancel" type="black" action={handleCancel} />
          <Button label="Confirm" type="black" action={handleChange} />
        </div>
      </div>
    </>
  )
}

export default ConfirmPassword
