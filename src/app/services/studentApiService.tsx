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
