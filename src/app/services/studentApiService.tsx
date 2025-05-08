import { Student } from "@/types/Student"

export const getStudentByStaffId = async (staffId: string) => {
  const url = `http://localhost:8080/students?staffId=${staffId}`
  try {
    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })

    const data = await result.json()

    return data
  } catch (e) {
    console.log(e)
  }
}

export const updateStudentById = async (
  studentId: string,
  staffId: string,
  password: string,
  student: Student
) => {
  const url = `http://localhost:8080/students/${studentId}`
  try {
    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        staffId,
        password,
        address: student.address,
        dob: student.dob,
        fullname: student.fullname,
      })
    })

    const data = await result.json()
    return data
  } catch (e) {
    console.log(e)
  }
}
