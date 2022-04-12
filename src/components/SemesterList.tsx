import React from "react";
import { Stack } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { SemesterView } from "./SemesterView";

export function SemesterList({
    semesters
}: {
    semesters: Semester[];
}): JSX.Element {
    return (
        <Stack gap={3} data-testid="Semester_List">
            {semesters.map((semester: Semester) => (
                <div
                    key={semester.session + semester.year}
                    className="bg-light border m-2 p-2"
                >
                    <SemesterView semester={semester}></SemesterView>
                </div>
            ))}
        </Stack>
    );
}
