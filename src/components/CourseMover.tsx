import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function CourseMover({
    semesters
}: {
    semesters: Semester[];
}): JSX.Element {
    const [origin, setOrigin] = useState<Semester>(semesters[0]);
    const [course, setCourse] = useState<Course>(origin.courses[0]);
    const [destination, setDestination] = useState<Semester>(semesters[0]);

    function updateOrigin(event: React.ChangeEvent<HTMLSelectElement>) {
        const chosenInd = semesters.findIndex(
            (semester: Semester): boolean =>
                semester.session + ":" + semester.year === event.target.value
        );
        setOrigin(semesters[chosenInd]);
    }

    function updateCourse(event: React.ChangeEvent<HTMLSelectElement>) {
        const chosenInd = origin.courses.findIndex(
            (course: Course): boolean => course.code === event.target.value
        );
        setCourse(origin.courses[chosenInd]);
    }

    function updateDestination(event: React.ChangeEvent<HTMLSelectElement>) {
        const chosenInd = semesters.findIndex(
            (semester: Semester): boolean =>
                semester.session + ":" + semester.year === event.target.value
        );
        setDestination(semesters[chosenInd]);
    }

    function completeMove() {}
    return (
        <Col>
            <Row>
                <Form.Group>
                    <Form.Label>Select a Semester to Move From:</Form.Label>
                    <Form.Select
                        value={origin.session + ":" + origin.year}
                        onChange={updateOrigin}
                    >
                        {semesters.map((semester: Semester) => (
                            <option
                                key={semester.session + ":" + semester.year}
                                value={semester.session + ":" + semester.year}
                            >
                                {semester.session}:{semester.year}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label>Select a Course to Move:</Form.Label>
                    <Form.Select value={course.code} onChange={updateCourse}>
                        {origin.courses.map((course: Course) => (
                            <option key={course.code} value={course.code}>
                                {course.code}:{course.title}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label>
                        Select a Semester or Course Pool to move to:
                    </Form.Label>
                    <Form.Select
                        value={destination.session + ":" + destination.year}
                        onChange={updateDestination}
                    >
                        {/*<option value="Course_Pool">Course Pool</option>*/}
                        {semesters.map((semester: Semester) => (
                            <option
                                key={semester.session + ":" + semester.year}
                                value={semester.session + ":" + semester.year}
                            >
                                {semester.session}:{semester.year}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row>
                <Button onClick={completeMove}>Move Course</Button>
            </Row>
        </Col>
    );
}
