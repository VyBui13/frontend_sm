"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { useStaff } from "@/app/contexts/StaffContext"

const NavUser = () => {
  const { staff } = useStaff()

  if (!staff) return <div>...</div>

  return (
    <>
      <div className=" bg-[var(--text-in-background-color)] flex w-full items-center justify-between p-2">
        <div className="avatar mr-2 flex h-4 w-4 items-center justify-center rounded-lg bg-[var(--main-color)] p-4">
          <FontAwesomeIcon icon={faUser} className="text-[var(--text-in-background-color)]" />
        </div>
        <div className="detail flex-1">
          <h1 className="text-sm font-bold text-[var(--main-color)]">{staff?.fullname}</h1>
          <p className="text-sm text-gray-500">{staff?.email}</p>
        </div>

        <div className="button flex h-4 w-4 cursor-pointer items-center justify-center rounded-lg p-4">
          <FontAwesomeIcon icon={faEllipsisVertical} className="text-[var(--main-color)]" />
        </div>
      </div>
    </>
  )
}

export default NavUser
