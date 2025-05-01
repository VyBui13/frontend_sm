export const getAllLop = async () => {
  const url = "http://localhost:8080/lops"
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
