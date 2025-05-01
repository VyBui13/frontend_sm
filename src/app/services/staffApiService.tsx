export const signIn = async (username: string, password: string) => {
  const url = 'http://localhost:8080/staffs/sign-in';
  try {
    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    })

    const data = await result.json()

    return data;
  } catch (e) {
    console.log(e)
  }
}
