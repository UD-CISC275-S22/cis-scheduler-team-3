import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import type { Course } from "../interfaces/course";

export function ValidateNewCourse({
    createCourse
}: {
    createCourse: (newCourse: Course) => void;
}): JSX.Element {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [credits, setCredits] = useState<number>(0);
    // const [courseList, setCourseList] = useState<Course[]>(courses);
    const [hasPrerequisites, setHasPrerequisites] = useState<boolean>(false);
    const [prerequisiteList, setPrerequisiteList] = useState<string[]>([]);
    const [isRequired, setIsRequired] = useState<boolean>(false);
    const [currentPrereq, setCurrentPrereq] = useState<string>("");
    const possibleCredits = [1, 2, 3, 4];

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

    function updatePrerequisites(event: React.ChangeEvent<HTMLInputElement>) {
        setHasPrerequisites(event.target.checked);
    }

    function updateRequired() {
        setIsRequired(!isRequired);
    }

    function updateCurrentPrereq(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentPrereq(event.target.value);
    }

    function updatePrereqList() {
        console.log(currentPrereq);
        if (currentPrereq !== "") {
            setPrerequisiteList([...prerequisiteList, currentPrereq]);
            console.log(prerequisiteList);
            setCurrentPrereq("");
        }
    }

    function saveNewQuiz() {
        createCourse({
            code: code,
            title: title,
            description: description,
            course_credits: credits,
            prerequisites: prerequisiteList,
            requirement: isRequired
        });
    }

    return (
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
                        <Form.Select value={credits} onChange={updateCredits}>
                            {possibleCredits.map((creditAmount: number) => (
                                <option key={creditAmount} value={creditAmount}>
                                    {creditAmount}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form>
                        <Form.Check
                            inline
                            type="radio"
                            id="has-prerequisites"
                            checked={isRequired}
                            onChange={updateRequired}
                            label="this course is required for my degree"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            id="has-prerequisites"
                            checked={!isRequired}
                            onChange={updateRequired}
                            label="this course is not required for my degree"
                        />
                    </Form>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            id="has-prerequisites"
                            checked={hasPrerequisites}
                            onChange={updatePrerequisites}
                            label="course has prerequisites"
                        />
                    </Form.Group>
                    {!hasPrerequisites ? null : (
                        <div>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    value={currentPrereq}
                                    onChange={updateCurrentPrereq}
                                />
                            </Form.Group>
                            <Button
                                id="prereq-add-button"
                                onClick={updatePrereqList}
                            >
                                add prerequisite
                            </Button>
                            <p>Course Prerequisites: </p>
                            {prerequisiteList.map((prereq: string) => (
                                <div key={prereq}>
                                    <h6>{prereq}</h6>
                                </div>
                            ))}
                        </div>
                    )}
                </Row>
                <Button type="submit" onClick={saveNewQuiz}>
                    Add course
                </Button>
            </Form>
        </Row>
    );
}
