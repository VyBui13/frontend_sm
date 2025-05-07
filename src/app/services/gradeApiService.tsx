export const getGrade = async (studentId: string, password: string) => {
  const url = `http://localhost:8080/courses?studentId=${studentId}&password=${password}`
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

export const updateGrade = async (
  studentId: string,
  staffId: string,
  password: string,
  grade: Record<string, number>,
) => {
  const url = `http://localhost:8080/courses?studentId=${studentId}`
  try {
    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        staffId,
        password,
        updateCourseGradeData: grade,
      }),
    })

    const data = await result.json()

    return data
  } catch (e) {
    console.log(e)
  }
}
