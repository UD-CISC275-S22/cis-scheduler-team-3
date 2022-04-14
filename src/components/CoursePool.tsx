import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { CourseView } from "./CourseView";
import { ValidateNewCourse } from "./NewCourse";
import POOL_DATA from "../data/course_pool.json";
import type { Course } from "../interfaces/course";
import { CourseMover } from "./CourseMover";

export function CoursePool(): JSX.Element {
    const POOLCOURSES = POOL_DATA as Course[];
    const [newCourse, setNewCourse] = useState<boolean>(false);
    const [poolCourses, setPoolCourses] = useState<Course[]>(POOLCOURSES);
    const [movecourse, setMoveCourse] = useState<boolean>(false);

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
                <Button onClick={hasNewQuiz} data-testid="add-course-btn">
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
            <Row lg={4} id="course-row" data-testid="course-pool">
                {poolCourses.map((course: Course) => (
                    <CourseView key={course.code} course={course}></CourseView>
                ))}
            </Row>
            <Row>
                <Button onClick={() => setMoveCourse(!movecourse)}>
                    Move Course from Pool
                </Button>
                {movecourse ? <CourseMover></CourseMover> : null}
            </Row>
        </Container>
    );
}
