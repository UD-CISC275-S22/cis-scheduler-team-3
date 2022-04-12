import React from "react";
import { Course } from "../interfaces/course";
import { Stack } from "react-bootstrap";
import { CourseView } from "./CourseView";

export function CourseList({ courses }: { courses: Course[] }): JSX.Element {
    return (
        <Stack gap={3} data-testid="Course_List">
            {courses.map((course: Course) => (
                <div key={course.code} className="bg-light border m-2 p-2">
                    <CourseView course={course}></CourseView>
                </div>
            ))}
        </Stack>
    );
}
