import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { CourseList } from "./CourseList";
import { ValidateNewCourse } from "./NewCourse";
import { Course } from "../interfaces/course";

export function SemesterView({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    const [newCourse, setNewCourse] = useState<boolean>(false);
    const [removeCourse, setRemoveCourse] = useState<boolean>(false);
    const [semesterCourses, setSemesterCourses] = useState<Course[]>(
        semester.courses
    );
    const [course, setCourse] = useState<Course>(semesterCourses[0]);

    function createCourse(newCourse: Course) {
        setSemesterCourses([...semesterCourses, newCourse]);
    }

    function deleteCourse() {
        if (semesterCourses.length === 0) {
            setSemesterCourses([]);
        } else {
            const delInd = semesterCourses.findIndex(
                (c_course: Course): boolean => c_course.code === course.code
            );
            setSemesterCourses([
                ...semesterCourses.slice(0, delInd),
                ...semesterCourses.slice(delInd + 1)
            ]);
        }
    }

    function updateCourse(event: React.ChangeEvent<HTMLSelectElement>) {
        const chosenInd = semesterCourses.findIndex(
            (course: Course): boolean => course.code === event.target.value
        );
        setCourse(semesterCourses[chosenInd]);
    }

    return (
        <Container data-testid="Semester">
            <Row>
                <Col>
                    <h3 data-testid="Semester_Title">
                        {semester.session}:{semester.year}
                    </h3>
                    <h4 data-testid="Semester_Credits">
                        Total Credits: {semester.semester_credits}
                    </h4>
                    <Row>
                        <Button onClick={() => setNewCourse(!newCourse)}>
                            Add Course to Semester
                        </Button>
                        {newCourse ? (
                            <ValidateNewCourse
                                createCourse={createCourse}
                            ></ValidateNewCourse>
                        ) : null}
                    </Row>
                    <Row>
                        <Button
                            data-testid="Remove Toggle"
                            onClick={() => setRemoveCourse(!removeCourse)}
                        >
                            Remove Course from Semester
                        </Button>
                        {removeCourse ? (
                            <div>
                                <Form.Group>
                                    <Form.Label>
                                        Select Course to Delete
                                    </Form.Label>
                                    <Form.Select
                                        value={course.code}
                                        onChange={updateCourse}
                                    >
                                        <option></option>
                                        {semesterCourses.map(
                                            (course: Course) => (
                                                <option
                                                    data-testid={course.code}
                                                    key={course.code}
                                                    value={course.code}
                                                >
                                                    {course.code}:{course.title}
                                                </option>
                                            )
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                <Button
                                    data-testid="Remove Confirm"
                                    onClick={deleteCourse}
                                >
                                    Delete Course
                                </Button>
                            </div>
                        ) : null}
                    </Row>
                    <CourseList courses={semesterCourses}></CourseList>
                </Col>
            </Row>
        </Container>
    );
}
