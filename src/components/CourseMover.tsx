import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function CourseMover({
    semesters,
    plan_pool,
    completeMove
}: {
    semesters: Semester[];
    plan_pool: Course[];
    completeMove: (course: string, origin: string, destination: string) => void;
}): JSX.Element {
    const [origin, setOrigin] = useState<string>(
        semesters[0].session + ":" + semesters[0].year
    );
    const [course, setCourse] = useState<string>(semesters[0].courses[0].code);
    const [destination, setDestination] = useState<string>(
        semesters[0].session + ":" + semesters[0].year
    );
    //let flag = false;

    function courseListSelector(): Course[] {
        let toReturn: Course[];
        if (origin === "Course_Pool") {
            toReturn = plan_pool;
        } else {
            const index = semesters.findIndex(
                (semester: Semester): boolean =>
                    semester.session + ":" + semester.year === origin
            );
            toReturn = semesters[index].courses;
        }
        return toReturn;
    }
    function updateOrigin(event: React.ChangeEvent<HTMLSelectElement>) {
        /*const chosenInd = semesters.findIndex(
            (semester: Semester): boolean =>
                semester.session + ":" + semester.year === event.target.value
        );*/
        setOrigin(event.target.value);
    }

    function updateCourse(event: React.ChangeEvent<HTMLSelectElement>) {
        /* const chosenInd = origin.courses.findIndex(
            (course: Course): boolean => course.code === event.target.value
        );*/
        setCourse(event.target.value);
    }

    function updateDestination(event: React.ChangeEvent<HTMLSelectElement>) {
        /*const chosenInd = semesters.findIndex(
            (semester: Semester): boolean =>
                semester.session + ":" + semester.year === event.target.value
        );*/
        setDestination(event.target.value);
    }

    function startMove() {
        completeMove(course, origin, destination);
    }
    return (
        <Col>
            <Row>
                <Form.Group>
                    <Form.Label>
                        Select a Semester or Course Pool to Move From:
                    </Form.Label>
                    <Form.Select value={origin} onChange={updateOrigin}>
                        <option value="Course_Pool">Course Pool</option>
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
                        <option selected disabled>
                            choose course
                        </option>
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
                    <Form.Label>
                        Select a Semester or Course Pool to move to:
                    </Form.Label>
                    <Form.Select
                        value={destination}
                        onChange={updateDestination}
                    >
                        <option value="Course_Pool">Course Pool</option>
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
