import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import type { Course } from "../interfaces/course";

export function ValidateNewCourse({
    courses
}: {
    courses: Course[];
}): JSX.Element {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [credits, setCredits] = useState<number>(0);
    const [courseList, setCourseList] = useState<Course[]>(courses);
    const possibleCredits = [0, 1, 2, 3, 4];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            setValidated(true);
        }
    };

    function updateCredits(event: React.ChangeEvent<HTMLSelectElement>) {
        const inputToNumber = parseInt(event.target.value);
        setCredits(inputToNumber);
    }

    function updateTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function updateCode(event: React.ChangeEvent<HTMLInputElement>) {
        setCode(event.target.value);
    }

    function updateDescription(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }

    function createCourse() {
        const newCourse: Course = {
            code: code,
            title: title,
            description: description,
            course_credits: credits,
            prerequisites: [],
            requirement: "false"
        };
        setCourseList([...courseList, newCourse]);
        console.log(courseList);
    }

    return (
        <Container>
            <Row>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="valid-course-title">
                            <Form.Label>Course Title: </Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                value={title}
                                onChange={updateTitle}
                            />
                            <Form.Control.Feedback>
                                Looks good!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="valid-course-title">
                            <Form.Label>Course Code: </Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                value={code}
                                onChange={updateCode}
                            />
                            <Form.Control.Feedback>
                                Looks good!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row>
                            <Form.Group
                                as={Col}
                                controlId="valid-course-description"
                            >
                                <Form.Label>Course Description: </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=""
                                    value={description}
                                    onChange={updateDescription}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please add a description for the course.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group controlId="valid-credits">
                            <Form.Label>Number of Credits: </Form.Label>
                            <Form.Select
                                value={credits}
                                onChange={updateCredits}
                            >
                                {possibleCredits.map((creditAmount: number) => (
                                    <option
                                        key={creditAmount}
                                        value={creditAmount}
                                    >
                                        {creditAmount}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button type="submit" onClick={createCourse}>
                        Add course
                    </Button>
                </Form>
            </Row>
            {courseList.map((course: Course) => (
                <h6 key={course.code}>
                    {course.title}
                    {course.code}
                    {course.description}
                    {course.requirement}
                    {course.prerequisites}
                </h6>
            ))}
        </Container>
    );
}
