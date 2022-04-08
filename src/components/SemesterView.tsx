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
                    <CourseList courses={semester.courses}></CourseList>
                </Col>
            </Row>
        </Container>
    );
}
