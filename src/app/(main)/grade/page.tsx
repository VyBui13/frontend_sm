"use client"
import DataTable from "@/components/DataTable"
import { Student } from "@/types/Student"
import { formatDateSting } from "@/utils/DateProvider"
import { use, useEffect, useState } from "react"
import InputForm from "./components/InputForm"
import { useStaff } from "@/app/contexts/StaffContext"
import { getStudentByStaffId } from "@/app/services/studentApiService"
import ConfirmPassword from "./components/ConfirmPassword"
import { useAlert } from "@/app/contexts/AlertContext"
import { signIn } from "@/app/services/staffApiService"
import DisplayTimer from "@/components/ui/DisplayTimer"
import AuthenticationDisplay from "./components/AuthenticationDisplay"

const studentHeaders = ["id", "fullname", "dob", "address", "classId"]
const proportions = [2, 4, 2, 4, 2]
const numOfRows = 7
const heightRow = 50

interface Token {
  username: string
  password: string
}

const GradingPage = () => {
  const { showAlert } = useAlert()
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const { staff } = useStaff()
  const [studentData, setStudentData] = useState<Student[]>([])
  const [token, setToken] = useState<Token | null>(null)
  const [isHideTokenPrompt, setIsHideTokenPrompt] = useState<boolean>(true)

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

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await signIn(token.username, token.password)
        if (response.status === "success") {
          showAlert("success", "Authenticate successful")
          setTimeout(() => {
            setToken(null)
          }
            , 60000)
          return
        }
        showAlert("error", "Unmatched creadentials")
        setToken(null)
      } catch (error) {
        console.error("Error signing in:", error)
        showAlert("error", "Server is down, please try again later")
      }
    }

    fetchData()
  }, [token]);

  const handleSeletedStudent = (student: Student) => {
    if (!token) {
      setIsHideTokenPrompt(false)
      showAlert("warning", "Please authenticate to continue")
      return
    }
    if (student) {
      setSelectedStudent(student)
    } else {
      setSelectedStudent(null)
    }
  }


  return (
    <>
      {!isHideTokenPrompt && (
        <ConfirmPassword
          action={(value: Token) => setToken(value)}
          actionCancel={() => setIsHideTokenPrompt(true)}
        />
      )}
      {token && selectedStudent && (
        <InputForm
          student={selectedStudent}
          password={token.password}
          actionClose={() => setSelectedStudent(null)}
          actionUpdateStudent={(student: Student) => {
            setStudentData((prev) =>
              prev.map((item) => {
                if (item.id === student.id) {
                  return {
                    ...item,
                    fullname: student.fullname,
                    dob: student.dob,
                    address: student.address,
                    classId: student.classId,
                  }
                }
                return item
              })
            )
          }
          }
        />
      )}


      <AuthenticationDisplay
        isAuthenticated={token ? true : false}
        seconds={token ? 60 : 0}
      />

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
        action={(item) => handleSeletedStudent(item)}
      />
    </>
  )
}

export default GradingPage
