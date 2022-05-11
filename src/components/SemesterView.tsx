import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreeplan";
import { CourseList } from "./CourseList";
import { Course } from "../interfaces/course";
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
    function updateAdd() {
        setAdd(!add);
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
                course_credits: 0,
                prerequisites: "",
                requirement: ""
            };
            const new_courses = [...semester.courses, newCourse];
            const newSemester = {
                ...semester,
                courses: new_courses
            };
            const sem_id = newSemester.session + ":" + newSemester.year;
            const newSemesters = plan.semesters.map(
                (semester: Semester): Semester =>
                    semester.session + ":" + semester.year === sem_id
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
        const credits_lost = semester.semester_credits;
        const newSemester = {
            ...semester,
            courses: [],
            semester_credits: 0
        };
        const sem_id = newSemester.session + ":" + newSemester.year;
        const newSemesters = plan.semesters.map(
            (semester: Semester): Semester =>
                semester.session + ":" + semester.year === sem_id
                    ? newSemester
                    : semester
        );
        const new_plan_credits = plan.degree_credits - credits_lost;
        const new_plan = {
            ...plan,
            semesters: newSemesters,
            degree_credits: new_plan_credits
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
                    <i data-testid="Semester_Credits">
                        Total Credits:{" "}
                        {isNaN(semester.semester_credits)
                            ? 0
                            : semester.semester_credits}
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
                    {add ? (
                        <div>
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
