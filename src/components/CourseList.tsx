import React from "react";
import type { Course } from "../interfaces/course";
import { Stack } from "react-bootstrap";
import { CourseView } from "./CourseView";

export function CourseList({ courses }: { courses: Course[] }): JSX.Element {
    return (
        <Stack gap={1} className="course-cards" data-testid="Course_List">
            {courses.map((course: Course) => (
                <div key={course.code}>
                    <CourseView course={course}></CourseView>
                </div>
            ))}
        </Stack>
    );
}
