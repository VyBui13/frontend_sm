"use client"
import DataTable from "@/components/DataTable"
import { Student } from "@/types/Student"
import { formatDateSting } from "@/utils/DateProvider"
import { useEffect, useState } from "react"
import InputForm from "./components/InputForm"
import { useStaff } from "@/app/contexts/StaffContext"
import { getStudentByStaffId } from "@/app/services/studentApiService"

const studentHeaders = ["id", "fullname", "dob", "address", "classId"]
const proportions = [2, 4, 2, 4, 2]
const numOfRows = 7
const heightRow = 50

const GradingPage = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const { staff } = useStaff()
  const [studentData, setStudentData] = useState<Student[]>([])

  useEffect(() => {
    if (!staff) return

    const fetchData = async () => {
      const response = await getStudentByStaffId(staff.id)

      if (response.status === "success") {
        setStudentData(
          response.data.map((student: Student) => {
            return {
              ...student,
              dob: formatDateSting(student.dob),
            }
          }),
        )
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {selectedStudent && (
        <InputForm
          student={selectedStudent}
          actionClose={() => setSelectedStudent(null)}
        />
      )}
      <DataTable
        headers={
          studentHeaders as (
            | "id"
            | "fullname"
            | "dob"
            | "address"
            | "classId"
          )[]
        }
        data={studentData}
        proportions={proportions}
        numOfRows={numOfRows}
        heightRow={heightRow}
        action={(item) => setSelectedStudent(item)}
      />
    </>
  )
}

export default GradingPage
