"use client"

import { Course } from "@/types/Course";
import { Student } from "@/types/Student";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import NothingDisplay from "@/components/NothingDisplay";

interface InputFormProps {
    student: Student;
    actionClose: () => void;
}

const courseData: Course[] = [
    { id: "C001", name: "Toán Đại Cương", credits: 3, studentId: "S001", grade: 85 },
    { id: "C002", name: "Lập Trình C", credits: 4, studentId: "S002", grade: 90 },
    { id: "C003", name: "Cấu Trúc Dữ Liệu", credits: 3, studentId: "S003", grade: 88 },
    { id: "C004", name: "Hệ Thống Thông Tin", credits: 3, studentId: "S004", grade: 75 },
    { id: "C005", name: "Cơ Sở Dữ Liệu", credits: 4, studentId: "S005", grade: 92 },
    { id: "C006", name: "Mạng Máy Tính", credits: 3, studentId: "S006", grade: 80 },
    { id: "C007", name: "Phân Tích Thiết Kế Hệ Thống", credits: 3, studentId: "S007", grade: 78 },
    { id: "C008", name: "Kỹ Thuật Lập Trình", credits: 4, studentId: "S008", grade: 82 },
    { id: "C009", name: "Kiến Trúc Máy Tính", credits: 3, studentId: "S009", grade: 89 },
    { id: "C010", name: "Giải Thuật", credits: 3, studentId: "S010", grade: 93 }
];


const InputForm = ({ student, actionClose }: InputFormProps) => {
    const [courseList, setCourseList] = useState<Course[]>(courseData);
    const initialCourseList = useRef(courseData);

    const compareScore = (a: Course) => {
        const item = initialCourseList.current.find(item => item.id === a.id);
        if (!item) {
            console.log("Làm dell gì undefined đc ")
            return false;
        }
        if (item.grade !== a.grade) {
            return false;
        }
        return true;
    }

    const handleSave = () => {
        const editedList = courseList.filter((course) => !compareScore(course));
        console.log("editedList", editedList);
        actionClose();
    }

    return (
        <>
            <div className="virtual-background">
                <div className="flex flex-col items-center justify-center bg-white w-3/6 p-8 rounded-lg shadow-lg">
                    <div className="student-info flex items-center justify-between w-full mb-6">
                        <div className="left flex items-center gap-4">
                            <div className="left w-7 h-7 rounded-full p-8 bg-black flex justify-center items-center">
                                <FontAwesomeIcon icon={faUser} className="text-xl text-white" />
                            </div>
                            <div className="right flex flex-col items-center justify-center">
                                <h1 className="text-xl font-black uppercase">{student.id} - {student.fullname}</h1>
                                <p className="text-sm font-semibold">{student.dob} - {student.address}</p>
                            </div>
                        </div>
                        <div className="right flex flex-col items-center justify-center">
                            <div className="status bg-green-500 rounded-lg px-4 py-2 mb-2">
                                <span className="text-base font-bold text-white">Available</span>
                            </div>
                        </div>
                    </div>

                    <div className="list-course w-full  overflow-y-auto max-h-50 .custom-scrollbar">
                        {courseList.length !== 0 && <div className="header flex items-center justify-between w-full">
                            <div
                                style={{
                                    flex: 1,
                                }}
                                className="flex items-center justify-center p-2"
                            >
                                <span
                                    className="text-base font-bold uppercase"
                                >ID</span>
                            </div>
                            <div
                                style={{
                                    flex: 4,
                                }}
                                className="flex items-center justify-center p-2"
                            >
                                <span
                                    className="text-base font-bold uppercase"
                                >Name</span>
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                }}
                                className="flex items-center justify-center p-2"
                            >
                                <span
                                    className="text-base font-bold uppercase"
                                >Credits</span>
                            </div>
                            <div
                                style={{
                                    flex: 2,
                                }}
                                className="flex items-center justify-center p-2"
                            >
                                <span
                                    className="text-base font-bold uppercase"
                                >Grade</span>
                            </div>
                        </div>}
                        <div className="body w-full">
                            {courseList.length === 0 && <NothingDisplay title="No course found!" />}
                            {courseList.map((course, index) => (
                                <div key={index}
                                    style={
                                        !compareScore(course) ? {
                                            backgroundColor: "#9c9c9c",
                                            color: "#000",
                                        } : {
                                            backgroundColor: "#fff",
                                            color: "#000",
                                        }
                                    }
                                    className="item flex items-center justify-between w-full rounded-lg">
                                    <div
                                        style={{
                                            flex: 1,
                                        }}
                                        className="flex items-center justify-center p-2"
                                    >
                                        <span
                                            className="text-base font-semibold"
                                        >
                                            {course.id}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            flex: 4,
                                        }}
                                        className="flex items-center justify-center p-2"
                                    >
                                        <span
                                            className="text-base font-semibold"
                                        >
                                            {course.name}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            flex: 1,
                                        }}
                                        className="flex items-center justify-center p-2"
                                    >
                                        <span
                                            className="text-base font-semibold"
                                        >
                                            {course.credits}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            flex: 2,
                                        }}
                                        className="flex items-center justify-center p-2"
                                    >
                                        <input
                                            value={course.grade}
                                            onChange={(e) => {
                                                const courseAfterEditing = { ...course, grade: parseFloat(e.target.value) || 0 };
                                                const newCourseList = courseList.map((item) => {
                                                    if (item.id === course.id) {
                                                        return courseAfterEditing;
                                                    }
                                                    return item;
                                                });
                                                setCourseList(newCourseList);

                                            }}
                                            className="text-base font-semibold w-full text-center outline-none"
                                            type="text"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="button w-full flex items-center justify-end mt-6 gap-4">
                        <Button
                            label="Cancel"
                            icon={faXmark}
                            type="danger"
                            action={actionClose}
                        />
                        <Button
                            label="Save"
                            icon={faCheck}
                            type="success"
                            action={handleSave}
                        />

                    </div>
                </div>
            </div >
        </>
    )
}

export default InputForm;