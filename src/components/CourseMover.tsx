import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Semester } from "../interfaces/semester";

export function CourseMover({
    semesters
}: {
    semesters: Semester[];
}): JSX.Element {
    return (
        <Col>
            <Row>
                <Form.Group>
                    <Form.Label>Select a Semester to Move From:</Form.Label>
                    <Form.Select></Form.Select>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label>Select a Course to Move:</Form.Label>
                    <Form.Select></Form.Select>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label>
                        Select a Semester or Course Pool to move to:
                    </Form.Label>
                    <Form.Select></Form.Select>
                </Form.Group>
            </Row>
            <Row>
                <Button>Move Course</Button>
            </Row>
        </Col>
    );
}
