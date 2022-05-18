import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function CourseMover({
    semesters,
    completeMove
}: {
    semesters: Semester[];
    completeMove: (
        coursecode: string,
        origin: string,
        destination: string
    ) => void;
}): JSX.Element {
    const [origin, setOrigin] = useState<string>("");
    const [course, setCourse] = useState<string>("");
    const [destination, setDestination] = useState<string>("");

    function courseListSelector(): Course[] {
        let toReturn: Course[] = [];
        if (origin === "") {
            return toReturn;
        }
        if (semesters.length === 0) {
            return toReturn;
        }
        if (semesters.length === 1) {
            toReturn = semesters[0].courses;
            return toReturn;
        } else {
            const index = semesters.findIndex(
                (semester: Semester): boolean =>
                    semester.session + ":" + semester.year === origin
            );
            toReturn = semesters[index].courses;
            return toReturn;
        }
    }
    function updateOrigin(event: React.ChangeEvent<HTMLSelectElement>) {
        setOrigin(event.target.value);
    }

    function updateCourse(event: React.ChangeEvent<HTMLSelectElement>) {
        setCourse(event.target.value);
    }

    function updateDestination(event: React.ChangeEvent<HTMLSelectElement>) {
        setDestination(event.target.value);
    }

    function startMove() {
        completeMove(course, origin, destination);
        resetMover();
    }
    function resetMover() {
        setOrigin("");
        setCourse("");
        setDestination("");
    }
    return (
        <Col>
            <Row>
                <Form.Group>
                    <Form.Label>Select a Semester to Move From:</Form.Label>
                    <Form.Select value={origin} onChange={updateOrigin}>
                        <option selected disabled>
                            Choose an Origin
                        </option>
                        <option> </option>
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
                    <Form.Select value={course} onChange={updateCourse}>
                        <option selected>Choose Course</option>
                        {courseListSelector().map((course: Course) => (
                            <option key={course.code} value={course.code}>
                                {course.code}:{course.title}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label>Select a Semester to move to:</Form.Label>
                    <Form.Select
                        value={destination}
                        onChange={updateDestination}
                    >
                        <option selected disabled>
                            Choose a Destination
                        </option>
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
                <Button className="Move-course" onClick={startMove}>
                    Move Course
                </Button>
            </Row>
        </Col>
    );
}
