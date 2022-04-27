import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { CourseView } from "./CourseView";
import { ValidateNewCourse } from "./NewCourse";
import type { Course } from "../interfaces/course";

export function CoursePool({
    plan_pool
}: {
    plan_pool: Course[];
}): JSX.Element {
    const [newCourse, setNewCourse] = useState<boolean>(false);
    const [poolCourses, setPoolCourses] = useState<Course[]>(plan_pool);

    function createCourse(newCourse: Course) {
        setPoolCourses([...poolCourses, newCourse]);
    }

    function hasNewQuiz() {
        setNewCourse(!newCourse);
    }
    return (
        <Container className="course-pool">
            <Row>
                <h5>Course Pool: </h5>
                <Button
                    onClick={hasNewQuiz}
                    className="Buttons"
                    data-testid="add-course-btn"
                >
                    Add Course to Pool
                </Button>
            </Row>
            <Row>
                {newCourse ? (
                    <ValidateNewCourse
                        createCourse={createCourse}
                    ></ValidateNewCourse>
                ) : null}
            </Row>
            <Row lg={6} id="course-row" data-testid="course-pool">
                {poolCourses.map((course: Course) => (
                    <CourseView key={course.code} course={course}></CourseView>
                ))}
            </Row>
        </Container>
    );
}
