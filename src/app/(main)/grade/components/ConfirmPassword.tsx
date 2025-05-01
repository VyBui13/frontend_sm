"use client"

import Button from "@/components/Button"
import { useState } from "react"

interface ConfirmPasswordProps {
  action: (value: string) => void
  actionClose: () => void
}

const ConfirmPassword = ({ action, actionClose }: ConfirmPasswordProps) => {
  const [password, setPassword] = useState<string>("")

  const handleChange = () => {
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
          <Button label="Confirm" type="black" action={handleChange} />
        </div>
      </div>
    </>
  )
}

export default ConfirmPassword
