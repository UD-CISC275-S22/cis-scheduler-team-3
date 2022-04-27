import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { CoursePoolTable } from "./CoursePoolTable";
import { ValidateNewCourse } from "./NewCourse";
import type { Course } from "../interfaces/course";
import { DegreePlan } from "../interfaces/degreeplan";
import POOL_DATA from "../data/course_catalog.json";

export function CoursePool({ plans }: { plans: DegreePlan[] }): JSX.Element {
    const POOLCOURSES = POOL_DATA as Course[];
    const DEGREEPLANS = [...plans];
    const [newCourse, setNewCourse] = useState<boolean>(false);
    const [poolCourses, setPoolCourses] = useState<Course[]>(POOLCOURSES);

    function createCourse(newCourse: Course) {
        setPoolCourses([...poolCourses, newCourse]);
    }

    function hasNewQuiz() {
        setNewCourse(!newCourse);
    }
    return (
        <Container
            className="course-pool"
            style={{ overflowY: "scroll", height: "400px" }}
        >
            <Row>
                <h5>Course Pool: </h5>
                <Button
                    onClick={hasNewQuiz}
                    className="Buttons"
                    data-testid="add-course-btn"
                >
                    {newCourse ? "Cancel" : "Add Course to Pool"}
                </Button>
            </Row>
            <Row>
                {newCourse ? (
                    <ValidateNewCourse
                        createCourse={createCourse}
                    ></ValidateNewCourse>
                ) : null}
            </Row>
            <Row>
                {poolCourses.map((course: Course) => (
                    <CoursePoolTable
                        key={course.code}
                        course={course}
                        plans={DEGREEPLANS}
                    ></CoursePoolTable>
                ))}
            </Row>
        </Container>
    );
}
