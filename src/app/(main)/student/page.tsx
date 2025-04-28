"use client"
import DataTable from "@/components/DataTable";

const studentHeaders = ["id", "name", "age"];
const studentData = [
    { id: 1, name: "Nguyen Van A", age: 20 },
    { id: 2, name: "Tran Thi B", age: 22 },
    { id: 3, name: "Le Van C", age: 19 },
    { id: 4, name: "Pham Thi D", age: 21 },
    { id: 5, name: "Do Van E", age: 23 },
];
const proportions = [2, 4, 2];
const numOfRows = 7;
const heightRow = 50;
interface filterType {
    title: string;
    column: string;
    data: string[];
}
const StudentPage = () => {
    return (
        <>
            <DataTable
                headers={studentHeaders as ("id" | "name" | "age")[]}
                data={studentData}
                filter={[]}
                proportions={proportions}
                numOfRows={numOfRows}
                heightRow={heightRow}
                action={(item) => console.log(item)}
            />
        </>
    );
};

export default StudentPage;