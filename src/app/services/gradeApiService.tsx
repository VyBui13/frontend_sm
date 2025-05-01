export const updateGrade = async (studentId: string, password: string, grade: Object) => {
    const url = `Điền url vào đây`;
    try {
        const result = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify({
                studentId,
                password,
                grade
            }),
        });

        const data = await result.json();

        return data;
    } catch (e) {
        console.log(e);
    }
}