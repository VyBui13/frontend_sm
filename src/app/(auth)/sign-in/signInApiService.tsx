export const signIn = async (username: string, password: string) => {
  try {
    const result = await fetch("http://localhost:8080/staffs/sign-in", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    })

    const data = await result.json()

    console.log(data)
  } catch (e) {
    console.log(e)
  }
}
