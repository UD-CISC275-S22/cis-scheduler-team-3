import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function CourseView({ course }: { course: Course }): JSX.Element {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Title: {course.title}</h3>
                    <h6>Code: {course.code}</h6>
                    <p>Description: {course.description}</p>
                    <i>Credits: {course.course_credits}</i>
                </Col>
                <Col>
                    <h6>Requirements fulfilled: {course.requirement}</h6>
                </Col>
            </Row>
        </Container>
    );
}
