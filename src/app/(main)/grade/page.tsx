"use client";
import DataTable from "@/components/DataTable";
import { Student } from "@/types/Student";
import { parseDateToString } from "@/utils/DateProvider";
import { useState } from "react";
import InputForm from "./components/InputForm";

const studentHeaders = ["id", "fullname", "dob", "address", "classId"];
const proportions = [2, 4, 2, 4, 2];
const numOfRows = 7;
const heightRow = 50;

const studentData: Student[] = [
    { id: "S001", fullname: "Nguyễn Văn A", dob: parseDateToString(new Date(2002, 5, 15)), address: "Hà Nội", classId: "C101" },
    { id: "S002", fullname: "Trần Thị B", dob: parseDateToString(new Date(2001, 8, 20)), address: "TP.HCM", classId: "C102" },
    { id: "S003", fullname: "Lê Văn C", dob: parseDateToString(new Date(2003, 1, 10)), address: "Đà Nẵng", classId: "C101" },
    { id: "S004", fullname: "Phạm Thị D", dob: parseDateToString(new Date(2002, 11, 5)), address: "Hải Phòng", classId: "C103" },
    { id: "S005", fullname: "Đỗ Văn E", dob: parseDateToString(new Date(2001, 3, 25)), address: "Cần Thơ", classId: "C102" },
    { id: "S006", fullname: "Ngô Thị F", dob: parseDateToString(new Date(2002, 7, 30)), address: "Nha Trang", classId: "C101" },
    { id: "S007", fullname: "Võ Văn G", dob: parseDateToString(new Date(2000, 9, 14)), address: "Bình Dương", classId: "C103" },
    { id: "S008", fullname: "Dương Thị H", dob: parseDateToString(new Date(2003, 2, 28)), address: "Vũng Tàu", classId: "C101" },
    { id: "S009", fullname: "Bùi Văn I", dob: parseDateToString(new Date(2001, 10, 9)), address: "Long An", classId: "C102" },
    { id: "S010", fullname: "Phan Thị K", dob: parseDateToString(new Date(2002, 4, 17)), address: "Quảng Nam", classId: "C103" },
];

const filter = [
    {
        title: "ClassID",
        column: "classId",
        data: ["C101", "C102", "C103"],
    }
]

const GradingPage = () => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    return (
        <>
            {selectedStudent && <InputForm student={selectedStudent} actionClose={() => setSelectedStudent(null)} />}
            <DataTable
                filter={filter}
                headers={studentHeaders as ("id" | "fullname" | "dob" | "address" | "classId")[]}
                data={studentData}
                proportions={proportions}
                numOfRows={numOfRows}
                heightRow={heightRow}
                action={(item) => setSelectedStudent(item)}
            />
        </>
    );
}

export default GradingPage;