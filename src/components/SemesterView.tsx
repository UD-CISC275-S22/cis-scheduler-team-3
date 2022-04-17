import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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
    const [semesterCourses, setSemesterCourses] = useState<Course[]>(
        semester.courses
    );

    function createCourse(newCourse: Course) {
        setSemesterCourses([...semesterCourses, newCourse]);
    }

    return (
        <Container data-testid="Semester">
            <Row>
                <Col>
                    <Row>
                        <h3 data-testid="Semester_Title">
                            {semester.session}:{semester.year}
                        </h3>
                        <h4 data-testid="Semester_Credits">
                            Total Credits: {semester.semester_credits}
                        </h4>
                        <Button onClick={() => setNewCourse(!newCourse)}>
                            Add Course to Semester
                        </Button>
                    </Row>
                    <Row>
                        {newCourse ? (
                            <ValidateNewCourse
                                createCourse={createCourse}
                            ></ValidateNewCourse>
                        ) : null}
                    </Row>
                    <CourseList courses={semesterCourses}></CourseList>
                </Col>
            </Row>
        </Container>
    );
}
