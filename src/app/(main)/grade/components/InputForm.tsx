"use client"

import { Course } from "@/types/Course"
import { Student } from "@/types/Student"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import Button from "@/components/Button"
import NothingDisplay from "@/components/NothingDisplay"
import ConfirmPassword from "./ConfirmPassword"
import { getGrade, updateGrade } from "@/app/services/gradeApiService"
import { useStaff } from "@/app/contexts/StaffContext"

interface InputFormProps {
  student: Student
  actionClose: () => void
}

const InputForm = ({ student, actionClose }: InputFormProps) => {
  const { staff } = useStaff()
  if (!staff) return <div>hihi đồ ngốc</div>

  const [courseList, setCourseList] = useState<Course[]>([])
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [isHidePassword, setIsHidePassword] = useState<boolean>(false)

  const initialCourseList = useRef<Course[]>([])

  useEffect(() => {
    if (confirmPassword === "") return

    const fetchData = async () => {
      const response = await getGrade(student.id, confirmPassword)
      const { status, message, data } = response

      if (status === "success") {
        setCourseList(data)
        initialCourseList.current = data
      } else if (status === "failed" && message === "Unmatched credentials") {
        setConfirmPassword("")
        setIsHidePassword(false)
        alert(message)
      }
    }

    fetchData()
  }, [confirmPassword])

  const compareScore = (a: Course) => {
    const item = initialCourseList.current.find(
      (item) => item.courseId === a.courseId,
    )
    if (!item) {
      return false
    }
    if (item.grade !== a.grade) {
      return false
    }
    return true
  }

  const handleSave = () => {
    if (!confirmPassword) {
      setIsHidePassword(false)
      return
    }

    setConfirmPassword("")

    const obj = courseList
      .filter((course) => !compareScore(course))
      .reduce<{ [key: string]: number }>(
        (item, course) => {
          item[course.courseId] = course.grade
          return item
        },
        {} as { [key: string]: number },
      )

    if (Object.keys(obj).length > 0)
      updateGrade(student.id, staff.id, confirmPassword, obj)

    actionClose()
  }

  return (
    <>
      {!isHidePassword && (
        <ConfirmPassword
          action={(value) => setConfirmPassword(value)}
          actionClose={() => setIsHidePassword(true)}
        />
      )}
      <div className="virtual-background">
        <div className="flex w-3/6 flex-col items-center justify-center rounded-lg bg-white p-8 shadow-lg">
          <div className="student-info mb-6 flex w-full items-center justify-between">
            <div className="left flex items-center gap-4">
              <div className="left flex h-7 w-7 items-center justify-center rounded-full bg-black p-8">
                <FontAwesomeIcon icon={faUser} className="text-xl text-white" />
              </div>
              <div className="right flex flex-col items-center justify-center">
                <h1 className="text-xl font-black uppercase">
                  {student.id} - {student.fullname}
                </h1>
                <p className="text-sm font-semibold">
                  {student.dob} - {student.address}
                </p>
              </div>
            </div>
            <div className="right flex flex-col items-center justify-center">
              <div className="status mb-2 rounded-lg bg-green-500 px-4 py-2">
                <span className="text-base font-bold text-white">
                  Available
                </span>
              </div>
            </div>
          </div>

          <div className="list-course .custom-scrollbar max-h-50 w-full overflow-y-auto">
            {courseList.length !== 0 && (
              <div className="header flex w-full items-center justify-between">
                <div
                  style={{
                    flex: 1,
                  }}
                  className="flex items-center justify-center p-2"
                >
                  <span className="text-base font-bold uppercase">ID</span>
                </div>
                <div
                  style={{
                    flex: 4,
                  }}
                  className="flex items-center justify-center p-2"
                >
                  <span className="text-base font-bold uppercase">Name</span>
                </div>
                <div
                  style={{
                    flex: 1,
                  }}
                  className="flex items-center justify-center p-2"
                >
                  <span className="text-base font-bold uppercase">Credits</span>
                </div>
                <div
                  style={{
                    flex: 2,
                  }}
                  className="flex items-center justify-center p-2"
                >
                  <span className="text-base font-bold uppercase">Grade</span>
                </div>
              </div>
            )}
            <div className="body w-full">
              {courseList.length === 0 && (
                <NothingDisplay title="No course found!" />
              )}
              {courseList.map((course, index) => (
                <div
                  key={index}
                  style={
                    !compareScore(course)
                      ? {
                          backgroundColor: "#9c9c9c",
                          color: "#000",
                        }
                      : {
                          backgroundColor: "#fff",
                          color: "#000",
                        }
                  }
                  className="item flex w-full items-center justify-between rounded-lg"
                >
                  <div
                    style={{
                      flex: 1,
                    }}
                    className="flex items-center justify-center p-2"
                  >
                    <span className="text-base font-semibold">
                      {course.courseId}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 4,
                    }}
                    className="flex items-center justify-center p-2"
                  >
                    <span className="text-base font-semibold">
                      {course.courseName}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                    }}
                    className="flex items-center justify-center p-2"
                  >
                    <span className="text-base font-semibold">
                      {course.credits}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 2,
                    }}
                    className="flex items-center justify-center p-2"
                  >
                    <input
                      value={course.grade}
                      onChange={(e) => {
                        const courseAfterEditing = {
                          ...course,
                          grade: parseFloat(e.target.value) || 0,
                        }
                        const newCourseList = courseList.map((item) => {
                          if (item.courseId === course.courseId) {
                            return courseAfterEditing
                          }
                          return item
                        })
                        setCourseList(newCourseList)
                      }}
                      className="w-full text-center text-base font-semibold outline-none"
                      type="text"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="button mt-6 flex w-full items-center justify-end gap-4">
            <Button
              label="Cancel"
              icon={faXmark}
              type="danger"
              action={actionClose}
            />
            <Button
              label="Save"
              icon={faCheck}
              type="success"
              action={handleSave}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default InputForm
