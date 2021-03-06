import React, { useState } from "react";
import { Container, Row, Col, Alert, Modal } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
/* function that generates the view for each course in the course pool, can use show/hide to see course info*/
export function CoursePoolTable({
    course,
    plan,
    semester,
    editPlan
}: {
    course: Course;
    plan: DegreePlan;
    semester: Semester;
    editPlan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const [style, setStyle] = useState<string>("collapse hide");
    const [addCourse, setAddCourse] = useState<boolean>(false);
    const [prereqSatisfied, setprereqSatisfied] = useState<boolean>(false);
    const [prereqUnsatisfied, setprereqUnsatisfied] = useState<boolean>(false);
    const [courseExists, setCourseExists] = useState<boolean>(false);
    //this file has a slightly different capitalization style due to long variable names
    function handleCloseSatisfied() {
        setprereqSatisfied(false);
    }

    function handleShowSatisfied() {
        setprereqSatisfied(true);
    }

    function handleCloseUnsatisfied() {
        setprereqUnsatisfied(false);
    }
    function handleShowUnsatisfied() {
        setprereqUnsatisfied(true);
    }
    function handleCloseCourseExists() {
        setCourseExists(false);
    }

    function handleShowCourseExists() {
        setCourseExists(true);
    }
    function checkPrerequisites(): boolean {
        const isemptystring = course.prerequisites?.length === 0;
        return isemptystring;
    }

    function updateCourseList(newCourse: Course) {
        const courseInfo = {
            code: newCourse.code,
            title: newCourse.title,
            description: newCourse.description,
            coursecredits: newCourse.coursecredits,
            prerequisites: newCourse.prerequisites,
            requirement: newCourse.requirement
        };
        const new_courses = [...semester.courses, courseInfo];
        const newsemcredits =
            semester.semestercredits + newCourse.coursecredits;
        const newSemester = {
            ...semester,
            semestercredits: newsemcredits,
            courses: new_courses
        };
        const semesterid = newSemester.session + ":" + newSemester.year;
        const newSemesters = plan.semesters.map(
            (semester: Semester): Semester =>
                semester.session + ":" + semester.year === semesterid
                    ? newSemester
                    : semester
        );
        const newdegreecredits = plan.degreecredits + newCourse.coursecredits;
        const new_plan = {
            ...plan,
            degreecredits: newdegreecredits,
            semesters: newSemesters
        };
        editPlan(plan.name, new_plan);
    }

    function addClassToSemester() {
        updateCourseAdded();
        console.log("Courses clicked:" + course.code);
        console.log(course);
        const code = courseLowerCase();
        const prereq = prereqLowerCase();
        console.log("Course code: " + code);
        console.log("Prerequisite necessary: " + prereq);
        const satisfiedStatus = preReqInSemester(prereq);
        console.log(satisfiedStatus);
        let CourseExistsInPlan = false;
        plan.semesters.map((currentSemester: Semester) => {
            currentSemester.courses.map((desiredCourse: Course) => {
                console.log(desiredCourse);
                if (
                    course.code.replace(/ /g, "").toLowerCase() ===
                    desiredCourse.code.replace(/ /g, "").toLowerCase()
                ) {
                    CourseExistsInPlan = true;
                }
            });
        });
        if (CourseExistsInPlan) {
            console.log("course already exists in plan");
            showModal("courseExists");
        }
        if (satisfiedStatus === "prereq is satisfied" && !CourseExistsInPlan) {
            updateCourseList(course);
            console.log("course added");
            showModal("satisfied");
        }
        if (satisfiedStatus === "prereq unsatisfied" && !CourseExistsInPlan) {
            console.log("cannot add this course: prerequisite unsatisfied");
            showModal("unsatisfied");
        }
    }

    function showModal(modalType: string) {
        if (modalType === "unsatisfied") {
            handleShowUnsatisfied();
        }
        if (modalType === "satisfied") {
            handleShowSatisfied();
        }
        if (modalType === "courseExists") {
            handleShowCourseExists();
        }
    }

    function updateCourseAdded() {
        setAddCourse(!addCourse);
    }

    function courseLowerCase(): string {
        let codeNoSpaces = "";
        if (!course.code) {
            codeNoSpaces = "";
        } else {
            codeNoSpaces = course.code.replace(/ /g, "").toLowerCase();
        }
        return codeNoSpaces;
    }

    function prereqLowerCase() {
        let codeNoSpaces = "";
        if (!course.prerequisites) {
            codeNoSpaces = "";
        } else {
            codeNoSpaces = course.prerequisites.replace(/ /g, "").toLowerCase();
        }
        return codeNoSpaces;
    }

    function multiplePrereqs(id: string, statement: string) {
        let multiple = "";
        if (statement.includes("and")) {
            multiple = "multiple";
        } else if (statement.includes("or")) {
            multiple = "either";
        } else {
            multiple = "one";
        }
        return multiple;
    }

    function onePrereq(statement: string) {
        let count = 0;
        plan.semesters.map((semester: Semester) => {
            semester.courses.map((course: Course) => {
                if (
                    statement.includes(
                        course.code.replace(/ /g, "").toLowerCase()
                    )
                ) {
                    count++;
                }
            });
        });
        if (count > 0) {
            return "prereq is satisfied";
        } else {
            return "prereq unsatisfied";
        }
    }

    function manyPrereq(statement: string) {
        const classes = statement.replace(/[^0-9]/g, "").length / 3;
        let count = 0;
        plan.semesters.map((semester: Semester) => {
            semester.courses.map((course: Course) => {
                if (
                    statement.includes(
                        course.code.replace(/ /g, "").toLowerCase()
                    )
                ) {
                    count++;
                }
            });
        });
        if (count === classes) {
            return "prereq is satisfied";
        } else {
            return "prereq unsatisfied";
        }
    }

    function preReqInSemester(preReqSentence: string) {
        let prereqStatus = "";
        console.log(preReqSentence);
        const coursesInSemester = semester.courses;
        if (preReqSentence === "") {
            prereqStatus = "prereq is satisfied";
            updateCourseAdded();
        } else if (coursesInSemester.length === 0) {
            const prereqId = course.code.replace(/ /g, "").toLowerCase();
            const type = multiplePrereqs(prereqId, preReqSentence);
            if (type === "multiple") {
                prereqStatus = manyPrereq(preReqSentence);
            }
            if (type === "either") {
                prereqStatus = onePrereq(preReqSentence);
            }
            if (type === "one") {
                if (preReqSentence.includes(prereqId)) {
                    prereqStatus = "prereq is satisfied";
                    updateCourseAdded();
                } else {
                    prereqStatus = "prereq unsatisfied";
                    updateCourseAdded();
                }
            }
        } else {
            coursesInSemester.map((prereq) => {
                const prereqId = prereq.code.replace(/ /g, "").toLowerCase();
                console.log(prereqId);
                console.log(preReqSentence);
                const type = multiplePrereqs(prereqId, preReqSentence);
                if (type === "multiple") {
                    prereqStatus = manyPrereq(preReqSentence);
                }
                if (type === "either") {
                    prereqStatus = onePrereq(preReqSentence);
                }
                if (type === "one") {
                    if (preReqSentence.includes(prereqId)) {
                        prereqStatus = "prereq is satisfied";
                        updateCourseAdded();
                    } else {
                        prereqStatus = "prereq unsatisfied";
                        updateCourseAdded();
                    }
                }
            });
        }
        return prereqStatus;
    }

    const toggleRow = () => {
        setOpen(!open);
        open ? setStyle("collapse hide") : setStyle("collapse show");
    };

    function ViewCourseInfo(): JSX.Element {
        return (
            <div className={style} id="course-info-collapse">
                <div className="card card-body">
                    <p>Credits: {course.coursecredits}</p>
                    <p>Description: {course.description}</p>
                    {checkPrerequisites() ? (
                        <p>Prerequisites: none</p>
                    ) : (
                        <p>Prerequisites: {course.prerequisites}</p>
                    )}
                    {checkPrerequisites() ? (
                        <p>Requirement fulfilled: none</p>
                    ) : (
                        <p>Requirement fulfilled: {course.requirement}</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <Container
            data-testid="scroll-courses"
            className="course-pool-scrollable"
        >
            <Row>
                <Col className="course-title-code">
                    {" "}
                    <h6>
                        {course.code} : {course.title}
                    </h6>
                </Col>
                <Col md="auto">
                    <Col>
                        <button
                            className="btn default"
                            data-testid="pool-show/hide-btn"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseExample"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                            onClick={toggleRow}
                        >
                            {open ? "hide course info" : " see course info"}
                            <i className="bi bi-plus-lg"></i>
                        </button>
                        <button
                            className="btn primary"
                            type="button"
                            onClick={addClassToSemester}
                        >
                            add class to semester
                        </button>
                    </Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ViewCourseInfo />
                </Col>
            </Row>
            <Modal
                size="lg"
                show={prereqSatisfied}
                onHide={handleCloseSatisfied}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Alert variant="success">
                        {course.code}: {course.title} has been successfully
                        added to {semester.session} {semester.year}.
                    </Alert>
                </Modal.Body>
            </Modal>
            <Modal
                size="lg"
                show={prereqUnsatisfied}
                onHide={handleCloseUnsatisfied}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Alert variant="warning">
                        You have not taken the prerequisite for {course.code}:{" "}
                        {course.title} yet. The prerequisite for this course:{" "}
                        {course.prerequisites}
                    </Alert>
                </Modal.Body>
            </Modal>
            <Modal
                size="lg"
                show={courseExists}
                onHide={handleCloseCourseExists}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Alert variant="warning">
                        {course.code}: {course.title} already exists in your
                        Plan.
                    </Alert>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
