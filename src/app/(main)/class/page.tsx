"use client"

import { getAllLop } from "@/app/services/lopApiService"
import DataTable from "@/components/DataTable"
import { Class } from "@/types/Class"
import { useEffect, useState } from "react"

const ClassPage = () => {
  const [classes, setClasses] = useState<Class[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllLop()
      const { status, message, data } = response

      if (status === "success") {
        setClasses(data)
      } else {
        alert(message)
      }
    }

    fetchData()
  }, [])

  return (
    <DataTable
      headers={
        ["classId", "className", "staffId", "staffName"] as (
          | "classId"
          | "className"
          | "staffId"
          | "staffName"
        )[]
      }
      data={classes}
      proportions={[2, 2, 2, 4]}
      heightRow={50}
      action={() => {}}
      numOfRows={7}
    ></DataTable>
  )
}

export default ClassPage
