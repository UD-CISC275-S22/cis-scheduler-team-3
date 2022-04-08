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
        <Container>
            <Row>
                <Col>
                    <h3>
                        {semester.session}:{semester.year}
                    </h3>
                    <h4>Total Credits: {semester.semester_credits}</h4>
                    <CourseList courses={semester.courses}></CourseList>
                </Col>
            </Row>
        </Container>
    );
}
