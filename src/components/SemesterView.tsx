import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreeplan";
import { CourseList } from "./CourseList";
import { Course } from "../interfaces/course";
import { CoursePool } from "./CoursePool";
/*
this function displays a container with all the Semester data:
session, year, total credits, course list, and add course button
*/
export function SemesterView({
    semester,
    plan,
    editPlan
}: {
    semester: Semester;
    plan: DegreePlan;
    editPlan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    const [add, setAdd] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [isempty, setIsempty] = useState<boolean>(false);
    const [invalidcourse, setInvalidcourse] = useState<boolean>(false);
    const [showpool, setShowpool] = useState<boolean>(false);
    function updateAdd() {
        setAdd(!add);
    }
    function showCoursepool() {
        setShowpool(!showpool);
    }
    function updateTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function updateCode(event: React.ChangeEvent<HTMLInputElement>) {
        setCode(event.target.value);
    }
    function cancelAddcourse() {
        setAdd(false);
        setTitle("");
        setCode("");
        setIsempty(false);
        setInvalidcourse(false);
    }
    function clearForm() {
        setCode("");
        setTitle("");
    }
    //function that generates a new course with given title & code, user edits other fields in courseView
    //function also checks if course already exists; doesn't allow user to add emtpy course
    function addCourse() {
        if (title === "" || code === "") {
            setIsempty(true);
            setInvalidcourse(false);
        } else if (
            semester.courses.findIndex(
                (course: Course): boolean =>
                    course.title + course.code === title + code
            ) >= 0
        ) {
            setIsempty(false);
            setInvalidcourse(true);
        } else {
            setIsempty(false);
            setInvalidcourse(false);
            const newCourse = {
                code: code,
                title: title,
                description: "",
                coursecredits: 0,
                prerequisites: "",
                requirement: ""
            };
            const new_courses = [...semester.courses, newCourse];
            const newSemester = {
                ...semester,
                courses: new_courses
            };
            const semesterid = newSemester.session + ":" + newSemester.year;
            const newSemesters = plan.semesters.map(
                (semester: Semester): Semester =>
                    semester.session + ":" + semester.year === semesterid
                        ? newSemester
                        : semester
            );
            const new_plan = {
                ...plan,
                semesters: newSemesters
            };
            editPlan(plan.name, new_plan);
            clearForm();
        }
    }
    function clearCourses() {
        const credits_lost = semester.semestercredits;
        const newSemester = {
            ...semester,
            courses: [],
            semestercredits: 0
        };
        const semesterid = newSemester.session + ":" + newSemester.year;
        const newSemesters = plan.semesters.map(
            (semester: Semester): Semester =>
                semester.session + ":" + semester.year === semesterid
                    ? newSemester
                    : semester
        );
        const new_plan_credits = plan.degreecredits - credits_lost;
        const new_plan = {
            ...plan,
            semesters: newSemesters,
            degreecredits: new_plan_credits
        };
        editPlan(plan.name, new_plan);
    }
    return (
        <Container data-testid="Semester">
            <Row>
                <Col>
                    <h5 data-testid="Semester_Title">
                        {semester.session}:{semester.year}
                    </h5>
                    <i data-testid="semestercredits">
                        Total Credits:{" "}
                        {isNaN(semester.semestercredits)
                            ? 0
                            : semester.semestercredits}
                    </i>
                    <p> </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        size="sm"
                        onClick={() => updateAdd()}
                        data-testid="add-course-btn"
                    >
                        ➕ add course
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => clearCourses()}
                        variant="warning"
                    >
                        clear courses
                    </Button>
                    <p> </p>
                    <Button
                        data-testid="show-pool-btn"
                        variant="success"
                        size="sm"
                        onClick={showCoursepool}
                        className="show-course-pool-button"
                    >
                        {showpool
                            ? "Hide Pool of CISC-related courses"
                            : "Show Pool of CISC-related courses"}
                    </Button>
                    <p> </p>
                    {showpool ? (
                        <CoursePool
                            planpool={plan.planpool}
                            plan={plan}
                            editPlan={editPlan}
                            semester={semester}
                        ></CoursePool>
                    ) : null}
                    {add ? (
                        <div>
                            <Form.Group as={Col} controlId="valid-course-title">
                                <Form.Label>Course Title: </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=""
                                    value={title}
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
                                />
                            </Form.Group>
                            <Button
                                size="sm"
                                onClick={addCourse}
                                data-testid="addcourse-btn"
                            >
                                add
                            </Button>
                            {isempty ? (
                                <i>please enter course title and code.</i>
                            ) : null}
                            {invalidcourse ? (
                                <i>course already exists in this semester.</i>
                            ) : null}
                            <Button
                                size="sm"
                                onClick={cancelAddcourse}
                                variant="warning"
                            >
                                cancel
                            </Button>
                        </div>
                    ) : null}
                </Col>
            </Row>
            <Row>
                <Col>
                    <CourseList
                        courses={semester.courses}
                        semester={semester}
                        plan={plan}
                        editPlan={editPlan}
                    ></CourseList>
                </Col>
            </Row>
        </Container>
    );
}
