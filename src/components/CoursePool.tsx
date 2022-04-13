import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { CourseView } from "./CourseView";
import { ValidateNewCourse } from "./NewCourse";
import POOL_DATA from "../data/course_pool.json";
import type { Course } from "../interfaces/course";

export function CoursePool(): JSX.Element {
    const POOLCOURSES = POOL_DATA as Course[];
    const [newCourse, setNewCourse] = useState<boolean>(false);
    const [poolCourses, setPoolCourses] = useState<Course[]>(POOLCOURSES);

    function createCourse(newCourse: Course) {
        setPoolCourses([...poolCourses, newCourse]);
    }

    function hasNewQuiz() {
        setNewCourse(true);
    }
    return (
        <Container className="course-pool">
            <Row>
                <h1>Course Pool: </h1>
                <Button onClick={hasNewQuiz}>Add Course to Pool</Button>
            </Row>
            <Row>
                {newCourse ? (
                    <ValidateNewCourse
                        createCourse={createCourse}
                    ></ValidateNewCourse>
                ) : null}
            </Row>
            <Row lg={4} id="course-row">
                {poolCourses.map((course: Course) => (
                    <CourseView key={course.code} course={course}></CourseView>
                ))}
            </Row>
        </Container>
    );
}
