import React from "react";
import type { Course } from "../interfaces/course";
import { Container, Row } from "react-bootstrap";
import { CourseView } from "./CourseView";

export function CourseList({ courses }: { courses: Course[] }): JSX.Element {
    return (
        <Container className="course-pool" data-testid="Course_List">
            <Row lg={4} id="course-row">
                {courses.map((course: Course) => (
                    <div key={course.code}>
                        <CourseView course={course}></CourseView>
                    </div>
                ))}
            </Row>
        </Container>
    );
}
