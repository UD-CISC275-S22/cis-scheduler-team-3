import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";

export function CourseView({
    course,
    semester,
    plan,
    editplan
}: {
    course: Course;
    semester: Semester;
    plan: DegreePlan;
    editplan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    const id = course.title + ":" + course.code;
    const [editmode, seteditmode] = useState<boolean>(false);
    const [code, setcode] = useState<string>(course.code);
    const [title, settitle] = useState<string>(course.title);
    const [description, setdescription] = useState<string>(course.description);
    const [course_credits, setcourse_credits] = useState<string>(
        course.course_credits
    );
    const [currentprereq, setcurrentprereq] = useState<string>("");
    const [requirement, setrequirement] = useState<boolean>(course.requirement);
    const [hasPrerequisites, setHasPrerequisites] = useState<boolean>(false);
    const [PrerequisiteList, setPrerequisiteList] = useState<string>(
        course.prerequisites
    );
    const possibleCredits = ["", "1", "2", "3", "4"];
    function updateeditmode() {
        seteditmode(!editmode);
    }
    function isRequirement() {
        if (course.requirement) {
            return "yes";
        } else {
            return "no";
        }
    }
    function updateCredits(event: React.ChangeEvent<HTMLSelectElement>) {
        setcourse_credits(event.target.value);
    }

    function updateTitle(event: React.ChangeEvent<HTMLInputElement>) {
        settitle(event.target.value);
    }

    function updateCode(event: React.ChangeEvent<HTMLInputElement>) {
        setcode(event.target.value);
    }

    function updateDescription(event: React.ChangeEvent<HTMLInputElement>) {
        setdescription(event.target.value);
    }

    function updatePrerequisites(event: React.ChangeEvent<HTMLInputElement>) {
        setHasPrerequisites(event.target.checked);
    }

    function updateRequired() {
        setrequirement(!requirement);
    }

    function updateCurrentPrereq(event: React.ChangeEvent<HTMLInputElement>) {
        setcurrentprereq(event.target.value);
    }

    function updatePrereqList() {
        setPrerequisiteList(PrerequisiteList + currentprereq);
    }
    function save() {
        const newCourse = {
            code: code,
            title: title,
            description: description,
            course_credits: course_credits,
            prerequisites: PrerequisiteList,
            requirement: requirement
        };
        const course_list = semester.courses.map(
            (course: Course): Course =>
                course.title + ":" + course.code === id ? newCourse : course
        );
        const new_semester = { ...semester, courses: course_list };
        const sem_id = semester.session + ":" + semester.year;
        const semester_list = plan.semesters.map(
            (semester: Semester): Semester =>
                semester.session + ":" + semester.year === sem_id
                    ? new_semester
                    : semester
        );
        const new_plan = { ...plan, semesters: semester_list };
        editplan(plan.name, new_plan);
        updateeditmode();
    }
    function removeCourse() {
        const course_list = semester.courses.filter(
            (course: Course): boolean => course.title + ":" + course.code != id
        );
        const new_semester = { ...semester, courses: course_list };
        const sem_id = semester.session + ":" + semester.year;
        const semester_list = plan.semesters.map(
            (semester: Semester): Semester =>
                semester.session + ":" + semester.year === sem_id
                    ? new_semester
                    : semester
        );
        const new_plan = { ...plan, semesters: semester_list };
        editplan(plan.name, new_plan);
        updateeditmode();
    }
    return editmode ? (
        <Row>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="valid-course-title">
                        <Form.Label>Course Title: </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder=""
                            value={title}
                            data-testid="course-title-box"
                            onChange={updateTitle}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="valid-course-title">
                        <Form.Label>Course Code: </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder=""
                            value={code}
                            onChange={updateCode}
                            data-testid="course-code-box"
                        />
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
                                data-testid="course-des-box"
                                value={description}
                                onChange={updateDescription}
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group controlId="valid-credits">
                        <Form.Label>Number of Credits: </Form.Label>
                        <Form.Select
                            data-testid="course-credits-box"
                            value={course_credits}
                            onChange={updateCredits}
                            required
                        >
                            {possibleCredits.map((creditAmount: string) => (
                                <option key={creditAmount} value={creditAmount}>
                                    {creditAmount}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div>
                        <Form.Check
                            inline
                            type="radio"
                            id="has-prerequisites"
                            checked={requirement}
                            onChange={updateRequired}
                            label="this course is required for my degree"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            id="has-prerequisites"
                            checked={!requirement}
                            onChange={updateRequired}
                            label="this course is not required for my degree"
                        />
                    </div>
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
                                    value={currentprereq}
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
                            {PrerequisiteList}
                        </div>
                    )}
                </Row>
                <Button size="sm" onClick={save} data-testid="addcourse-btn">
                    save
                </Button>
                <Button size="sm" onClick={updateeditmode} variant="warning">
                    cancel
                </Button>
                <Button size="sm" onClick={removeCourse} variant="danger">
                    delete
                </Button>
            </Form>
        </Row>
    ) : (
        <div className="bg-light border m-2 p-2" data-testid="Course">
            <div>
                <Form.Check
                    type="switch"
                    id="course_editmode"
                    label="edit"
                    checked={editmode}
                    onChange={updateeditmode}
                />
            </div>
            <b className="title" data-testid="course-title">
                Title: {course.title}
            </b>
            <ul>
                <li data-testid="course-code" className="Course">
                    Code: {course.code}
                </li>
                <li data-testid="course-des" className="Course">
                    Description: {course.description}
                </li>
                <li data-testid="course-credits" className="Course">
                    Credits: {course.course_credits}
                </li>
                <li data-testid="course-req" className="Course">
                    Fulfills requirement: {isRequirement()}
                </li>
                <li data-testid="course-prereq" className="Course">
                    Prerequisites:
                    {course.prerequisites}
                </li>
            </ul>
        </div>
    );
}
