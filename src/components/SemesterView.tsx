import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { CourseList } from "./CourseList";

export function SemesterView({
    semester
}: {
    semester: Semester;
}): JSX.Element {
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
                    <CourseList courses={semester.courses}></CourseList>
                </Col>
            </Row>
        </Container>
    );
}
