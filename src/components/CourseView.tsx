import React, { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import { CourseInformation } from "./CourseInformation";
/*this function generates the Container which displays all the course info, it 
    also contains the form for editing a course, and a lengthy function that will
    eventually call edit plan to process these edits and display the correct result*/
export function CourseView({
    course,
    semester,
    plan,
    editPlan
}: {
    course: Course;
    semester: Semester;
    plan: DegreePlan;
    editPlan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    const id = course.title + ":" + course.code;
    const [editmode, setEditmode] = useState<boolean>(false);
    const [code, setCode] = useState<string>(course.code);
    const [title, setTitle] = useState<string>(course.title);
    const [description, setDescription] = useState<string>(course.description);
    const [coursecredits, setcoursecredits] = useState<number>(
        course.coursecredits
    );
    const [currentprereq, setCurrentprereq] = useState<string>("");
    const [requirement, setRequirement] = useState<string>(course.requirement);
    const [hasPrerequisites, setHasprerequisites] = useState<boolean>(false);
    const [PrerequisiteList, setPrerequisitelist] = useState<string>(
        course.prerequisites
    );
    const [invalidcourse, setInvalidcourse] = useState<boolean>(false);
    const possiblecredits = [0, 1, 2, 3, 4, 5, 6];
    function updateEditmode() {
        setEditmode(!editmode);
    }
    //update helper functions for the form
    function updateCredits(event: React.ChangeEvent<HTMLSelectElement>) {
        setcoursecredits(parseInt(event.target.value));
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
        setHasprerequisites(event.target.checked);
    }

    function updateRequired(event: React.ChangeEvent<HTMLInputElement>) {
        setRequirement(event.target.value);
    }

    function updateCurrentprereq(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentprereq(event.target.value);
    }

    function updatePrereqlist() {
        setPrerequisitelist(PrerequisiteList + " " + currentprereq + ",");
    }
    function checkValidity(): boolean {
        return (
            id !== title + ":" + code &&
            semester.courses.findIndex(
                (course: Course): boolean =>
                    course.title + course.code === title + code
            ) >= 0
        );
    }
    function save() {
        if (checkValidity()) {
            setInvalidcourse(true);
        } else {
            setInvalidcourse(false);
            const newCourse = {
                code: code,
                title: title,
                description: description,
                coursecredits: coursecredits,
                prerequisites: PrerequisiteList,
                requirement: requirement
            };
            const courselist = semester.courses.map(
                (course: Course): Course =>
                    course.title + ":" + course.code === id ? newCourse : course
            );
            semester.semestercredits =
                semester.semestercredits - course.coursecredits;
            const newSemCredits = semester.semestercredits + coursecredits;
            const newsemester = {
                ...semester,
                courses: courselist,
                semestercredits: newSemCredits
            };
            const semid = semester.session + ":" + semester.year;
            const semesterlist = plan.semesters.map(
                (semester: Semester): Semester =>
                    semester.session + ":" + semester.year === semid
                        ? newsemester
                        : semester
            );
            plan.degreecredits = plan.degreecredits - course.coursecredits;
            const newplancredits = plan.degreecredits + coursecredits;
            const newplan = {
                ...plan,
                semesters: semesterlist,
                degreecredits: newplancredits
            };
            editPlan(plan.name, newplan);
            updateEditmode();
        }
    }
    function removeCourse() {
        const courselist = semester.courses.filter(
            (course: Course): boolean => course.title + ":" + course.code != id
        );
        const new_SemCredits = semester.semestercredits - coursecredits;
        const new_semester = {
            ...semester,
            courses: courselist,
            semestercredits: new_SemCredits
        };
        const sem_id = semester.session + ":" + semester.year;
        const semester_list = plan.semesters.map(
            (semester: Semester): Semester =>
                semester.session + ":" + semester.year === sem_id
                    ? new_semester
                    : semester
        );
        const new_PlanCredits = plan.degreecredits - coursecredits;
        const new_plan = {
            ...plan,
            semesters: semester_list,
            degreecredits: new_PlanCredits
        };
        editPlan(plan.name, new_plan);
        updateEditmode();
    }
    return editmode ? (
        <Row>
            <Form.Check
                type="switch"
                id="course_editmode"
                label="?????? edit"
                checked={editmode}
                onChange={updateEditmode}
            />
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
                            value={coursecredits}
                            onChange={updateCredits}
                            required
                        >
                            {possiblecredits.map((creditAmount: number) => (
                                <option key={creditAmount} value={creditAmount}>
                                    {creditAmount}
                                </option>
                            ))}
                        </Form.Select>
                        <p></p>
                    </Form.Group>
                    <div>
                        <p>Fulfills Requirement:</p>
                        <Form.Check
                            inline
                            type="radio"
                            checked={requirement === "core"}
                            onChange={updateRequired}
                            label="core"
                            value="core"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            checked={requirement === "university breadth"}
                            onChange={updateRequired}
                            label="university breadth"
                            value="university breadth"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            checked={requirement === "multicultural"}
                            onChange={updateRequired}
                            label="multicultural"
                            value="multicultural"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            checked={requirement === "first year seminar"}
                            onChange={updateRequired}
                            label="first year seminar"
                            value="first year seminar"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            checked={requirement === "DLE"}
                            onChange={updateRequired}
                            label="DLE"
                            value="DLE"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            checked={requirement === "capstone"}
                            onChange={updateRequired}
                            label="capstone"
                            value="capstone"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            id="has-prerequisites"
                            checked={requirement === "additional"}
                            onChange={updateRequired}
                            label="additional"
                            value="additional"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            id="has-prerequisites"
                            checked={requirement === "science"}
                            onChange={updateRequired}
                            label="science"
                            value="science"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            id="has-prerequisites"
                            checked={requirement === "tech elective"}
                            onChange={updateRequired}
                            label="tech elective"
                            value="tech elective"
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
                                    onChange={updateCurrentprereq}
                                />
                            </Form.Group>
                            <Button
                                id="prereq-add-button"
                                onClick={updatePrereqlist}
                                size="sm"
                            >
                                add prerequisite
                            </Button>
                            <p>Course Prerequisites: </p>
                            {PrerequisiteList}
                        </div>
                    )}
                </Row>
                <Button size="sm" onClick={save} data-testid="savecourse-btn">
                    save
                </Button>
                {invalidcourse ? (
                    <i> oops! course already exists in this semester</i>
                ) : null}
                <Button
                    data-testid="delete-course-btn"
                    size="sm"
                    onClick={removeCourse}
                    variant="danger"
                >
                    delete
                </Button>
            </Form>
        </Row>
    ) : (
        <Container className="bg-light border m-2 p-2">
            <div>
                <Form.Check
                    type="switch"
                    label="??????edit"
                    checked={editmode}
                    onChange={updateEditmode}
                    data-testid="editcourse-switch"
                />
            </div>
            <CourseInformation course={course}></CourseInformation>
        </Container>
    );
}
