export const getStudentByStaffID = async (staffID: string) => {
    const url = 'Điền url vào đây';
    try {
        const result = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })

        const data = await result.json()

        return data;
    } catch (e) {
        console.log(e)
    }
}