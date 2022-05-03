import React from "react";
import { Course } from "../interfaces/course";
import { Container, Row } from "react-bootstrap";
import { CourseView } from "./CourseView";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
/* function that loops through array of courses, calling CourseView for each*/
export function CourseList({
    courses,
    plan,
    semester,
    editplan
}: {
    courses: Course[];
    plan: DegreePlan;
    semester: Semester;
    editplan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    return (
        <Container data-testid="Course_List">
            <Row>
                {courses.map((course: Course) => (
                    <div key={course.code}>
                        <CourseView
                            course={course}
                            semester={semester}
                            plan={plan}
                            editplan={editplan}
                        ></CourseView>
                    </div>
                ))}
            </Row>
        </Container>
    );
}
