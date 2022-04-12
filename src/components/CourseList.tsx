import React, { useState } from "react";
import type { Course } from "../interfaces/course";
import { Stack, Button } from "react-bootstrap";
import { CourseView } from "./CourseView";
import { ValidateNewCourse } from "./NewCourse";

export function CourseList({ courses }: { courses: Course[] }): JSX.Element {
    const [newCourse, setNewCourse] = useState<boolean>(false);

    function addCourse() {
        setNewCourse(true);
    }
    return (
        <Stack gap={3}>
            <Button onClick={addCourse}>Add Course to Pool</Button>
            {courses.map((course: Course) => (
                <div key={course.code} className="bg-light border m-2 p-2">
                    <CourseView course={course}></CourseView>
                </div>
            ))}
            {newCourse ? (
                <ValidateNewCourse courses={courses}></ValidateNewCourse>
            ) : null}
        </Stack>
    );
}
