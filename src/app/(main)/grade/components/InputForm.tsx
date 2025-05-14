"use client"

import { Course } from "@/types/Course"
import { Student } from "@/types/Student"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faXmark, faCheck, faPen } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import Button from "@/components/Button"
import NothingDisplay from "@/components/NothingDisplay"
import ConfirmPassword from "./ConfirmPassword"
import { getGrade, updateGrade } from "@/app/services/gradeApiService"
import { useStaff } from "@/app/contexts/StaffContext"
import { useAlert } from "@/app/contexts/AlertContext"
import { useConfirmPrompt } from "@/app/contexts/ConfirmContext"
import { updateStudentById } from "@/app/services/studentApiService"

interface InputFormProps {
  student: Student
  password: string
  actionClose: () => void
  actionUpdateStudent: (student: Student) => void

}

const InputForm = ({ student, actionClose, password, actionUpdateStudent }: InputFormProps) => {
  const { staff } = useStaff()
  const { showAlert } = useAlert()

  if (!staff) return <div></div>

  const [selectedStudent, setSelectedStudent] = useState<Student>({
    id: "",
    fullname: "",
    dob: "",
    address: "",
    classId: "",
  } as Student)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const [courseList, setCourseList] = useState<Course[]>([])

  const initialCourseList = useRef<Course[]>([])
  const { showConfirmPrompt } = useConfirmPrompt()
  useEffect(() => {
    setSelectedStudent(student)
  }, [student])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGrade(student.id, password)
      const { status, message, data } = response

      if (status === "success") {
        setCourseList(data)
        initialCourseList.current = data
      } else if (status === "failed" && message === "Unmatched credentials") {
        showAlert("error", message)
      }
    }

    fetchData()
  }, [])

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
    if (!password) {
      return
    }

    const obj = courseList
      .filter((course) => !compareScore(course))
      .reduce<{ [key: string]: number }>(
        (item, course) => {
          item[course.courseId] = course.grade
          return item
        },
        {} as { [key: string]: number },
      )

    if (Object.keys(obj).length > 0) {
      const fetchData = async () => {
        try {
          const response = await updateGrade(student.id, staff.id, password, obj)
          const { status, message } = response
          if (status === "success") {
            showAlert("success", message)
            actionClose()
          } else {
            showAlert("error", message)
          }
        } catch (error) {
          console.error("Error updating grade:", error)
          showAlert("error", "Server is down, please try again later")
        }
      }

      fetchData();
    }

  }

  const handleUpdateStudent = () => {
    if (!password) {
      return
    }

    const fetchData = async () => {
      try {
        const response = await updateStudentById(student.id, staff.id, password, selectedStudent)
        const { status, message } = response
        if (status === "success") {
          actionUpdateStudent(selectedStudent)
          showAlert("success", message)
          setIsUpdated(false)
        } else {
          showAlert("error", message)
        }
      }
      catch (error) {
        console.error("Error updating student:", error)
        showAlert("error", "Server is down, please try again later")
      }
    }

    fetchData()

  }

  return (
    <>
      <div className="virtual-background">
        <div className="flex items-stretch justify-center rounded-lg bg-[var(--background-color)] shadow-[var(--shadow)] overflow-hidden">
          <div className="left flex flex-col p-8">
            <div className="student-info mb-6 flex w-full items-center justify-between">
              <div className="left flex items-center gap-4">
                <div className="left flex h-7 w-7 items-center justify-center rounded-full bg-[var(--main-color)] p-8">
                  <FontAwesomeIcon icon={faUser} className="text-2xl text-[var(--text-in-background-color)]" />
                </div>
                <div className="right flex flex-col items-center justify-center">
                  <h1 className="text-xl font-black uppercase">
                    {selectedStudent.id} - {selectedStudent.fullname}
                  </h1>
                  <p className="text-sm font-semibold">
                    {selectedStudent.dob} - {selectedStudent.address}
                  </p>
                </div>
              </div>
              <div className="right flex items-center justify-center">
                {!isUpdated ? <Button
                  icon={faPen}
                  type="success"
                  action={() => {
                    setIsUpdated((prev) => !prev)
                  }}
                /> :
                  <Button
                    icon={faXmark}
                    type="danger"
                    action={() => {
                      setIsUpdated((prev) => !prev)
                    }}
                  />}
              </div>
            </div>

            <div className="list-course .custom-scrollbar max-h-50 w-full overflow-y-auto custom-scrollbar flex flex-col  flex-1">
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
              <div className="body w-full h-full">
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
                          backgroundColor: "var(--text-in-background-color)",
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
                        type="number"
                        step={0.1}
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
                action={() => {
                  showConfirmPrompt({
                    title: student.id,
                    actionLabel: "Update",
                    action: async () => {
                      handleSave()
                    },
                  })
                }
                }
              />
            </div>
          </div>

          <div
            style={{
              width: !isUpdated ? "0px" : "400px",
              opacity: !isUpdated ? "0" : "1",
              transition: "width 0.3s ease-in-out, opacity 0.3s ease-in-out",
            }}
            className="right overflow-hidden">
            <div className="form w-full bg-[var(--main-color)] p-8 h-full flex flex-col items-center justify-center">
              <div className="header w-full flex items-center justify-center">
                <h1
                  className="text-2xl uppercase text-center font-bold text-[var(--text-in-background-color)]"
                >Student Detail</h1>
              </div>
              <div className="body w-full flex-1">
                <div className="item my-2">
                  <p
                    className="mb-1 text-base font-semibold text-[var(--text-in-background-color)]"
                  >Fullname</p>
                  <input
                    value={selectedStudent.fullname}
                    className="w-full rounded-lg bg-[var(--background-color)] p-2 text-base font-semibold outline-none text-[var(--text-color)]"
                    onChange={(e) => setSelectedStudent({
                      ...selectedStudent,
                      fullname: e.target.value,
                    })}
                    type="text"
                  />
                </div>
                <div className="item my-2">
                  <p
                    className="mb-1 text-base font-semibold text-[var(--text-in-background-color)]"
                  >Date</p>
                  <input
                    value={selectedStudent.dob}
                    className="w-full rounded-lg bg-[var(--background-color)] p-2 text-base font-semibold outline-none text-[var(--text-color)]"
                    onChange={(e) => setSelectedStudent({
                      ...selectedStudent,
                      dob: e.target.value,
                    })}
                    type="date"
                  />
                </div>
                <div className="item my-2">
                  <p
                    className="mb-1 text-base font-semibold text-[var(--text-in-background-color)]"
                  >Address</p>
                  <input
                    value={selectedStudent.address}
                    className="w-full rounded-lg bg-[var(--background-color)] p-2 text-base font-semibold outline-none text-[var(--text-color)]"
                    onChange={(e) => setSelectedStudent({
                      ...selectedStudent,
                      address: e.target.value,
                    })}
                    type="text"
                  />
                </div>

              </div>
              <div className="footer flex w-full items-center justify-end gap-2">
                <Button
                  label="Update"
                  icon={faCheck}
                  type="success"
                  action={() => {
                    showConfirmPrompt({
                      title: student.id,
                      actionLabel: "Update",
                      action: async () => {
                        handleUpdateStudent()
                      },
                    })
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InputForm
