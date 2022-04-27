import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/course";
import type { DegreePlan } from "../interfaces/degreeplan";
import { AddCourseToPlan } from "../components/AddCourseToPlan";

export function CoursePoolTable({
    course,
    plans
}: {
    course: Course;
    plans: DegreePlan[];
}): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const [style, setStyle] = useState<string>("collapse hide");
    const [showModal, setShowModal] = useState<boolean>(false);
    //the following code may be implemented in the future to allow users to
    //edit courses in the course pool.
    // const [editMode, setEditMode] = useState<boolean>(false);
    // const [updateCode, setUpdatedCode] = useState<string>(course.code);
    // const [updateTitle, setUpdatedTitle] = useState<string>(course.title);
    // const [updateCredits, setUpdatedCredits] = useState<string>(
    //     course.course_credits
    // );
    // const [updatedDescr, setUpdatedDescr] = useState<string>(
    //     course.description
    // );
    // const [updatedPrereq, setUpdatedPrereq] = useState<string>("");

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     const form = event.currentTarget;
    //     // event.stopPropagation();
    //     event.preventDefault();
    // };

    function checkPrerequisites(): boolean {
        const isEmptyString = course.prerequisites?.length === 0;
        return isEmptyString;
    }

    const toggleRow = () => {
        console.log(course.code);
        setOpen(!open);
        open ? setStyle("collapse hide") : setStyle("collapse show");
    };

    function openModal() {
        setShowModal(!showModal);
    }

    // function defaultPrereqs(): string {
    //     const isEmpty = checkPrerequisites();
    //     let defaultPrereqs;
    //     if (isEmpty) {
    //         defaultPrereqs = "";
    //     } else {
    //         defaultPrereqs = course.prerequisites;
    //     }
    //     console.log(defaultPrereqs);
    //     return defaultPrereqs;
    // }

    // function SetEdit() {
    //     setEditMode(!editMode);
    //     console.log(editMode);
    //     console.log(course.code);
    // }

    // function updatePrereqs(event: React.ChangeEvent<HTMLInputElement>) {
    //     console.log(event.target.value);
    //     setUpdatedPrereq(event.target.value);
    // }

    // function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    //     console.log(event.key);
    // }

    // function saveUpdatedCourse() {
    //     console.log("saved");
    //     setEditMode(!editMode);
    // }

    // function EditCourseInfo(): JSX.Element {
    //     return (
    //         <div className={style} id="collapseExample">
    //             <div className="card card-body">
    //                 <Form onSubmit={handleSubmit}>
    //                     <InputGroup size="sm" className="mb-3">
    //                         <Form.Label>Course title:</Form.Label>
    //                         <FormControl
    //                             aria-label="Small"
    //                             aria-describedby="inputGroup-sizing-sm"
    //                             value={course.code}
    //                         />
    //                     </InputGroup>
    //                     <InputGroup size="sm" className="mb-3">
    //                         <Form.Label>Course title:</Form.Label>
    //                         <FormControl
    //                             aria-label="Small"
    //                             aria-describedby="inputGroup-sizing-sm"
    //                             value={course.title}
    //                         />
    //                     </InputGroup>
    //                     <InputGroup size="sm" className="mb-3">
    //                         <Form.Label>Credit Amount:</Form.Label>
    //                         <FormControl
    //                             aria-label="Small"
    //                             aria-describedby="inputGroup-sizing-sm"
    //                             value={course.course_credits}
    //                         />
    //                     </InputGroup>
    //                     <InputGroup size="sm" className="mb-3">
    //                         <Form.Label>Course description:</Form.Label>
    //                         <FormControl
    //                             aria-label="Small"
    //                             aria-describedby="inputGroup-sizing-sm"
    //                             value={course.description}
    //                         />
    //                     </InputGroup>
    //                     <InputGroup size="sm" className="mb-3">
    //                         <Form.Label>Course prerequisites:</Form.Label>
    //                         <FormControl
    //                             aria-label="Small"
    //                             aria-describedby="inputGroup-sizing-sm"
    //                             value={course.prerequisites}
    //                         />
    //                     </InputGroup>
    //                 </Form>
    //                 {updatedPrereq}
    //                 <Col xs lg="2">
    //                     <p>
    //                         <Button
    //                             variant="success"
    //                             data-id="edit-course-info-button"
    //                             type="submit"
    //                             onClick={saveUpdatedCourse}
    //                         >
    //                             Save Course Info
    //                         </Button>
    //                     </p>
    //                 </Col>
    //             </div>
    //         </div>
    //     );
    // }

    function ViewCourseInfo(): JSX.Element {
        return (
            <div className={style} id="course-info-collapse">
                <div className="card card-body">
                    <h6>Credits: {course.course_credits}</h6>
                    <h6>Description: {course.description}</h6>
                    {checkPrerequisites() ? (
                        <h6>Prerequisites: none</h6>
                    ) : (
                        <h6>Prerequisites: {course.prerequisites}</h6>
                    )}
                    {/* <Col xs lg="2">
                        <p>
                            <Button
                                data-id="edit-course-info-button"
                                onClick={SetEdit}
                            >
                                Edit Course Info
                            </Button>
                        </p>
                    </Col> */}
                </div>
            </div>
        );
    }

    return (
        <div>
            <Container className="course-pool-scrollable">
                <Row>
                    <Col>
                        {" "}
                        <p>
                            {course.code} : {course.title}
                        </p>
                    </Col>
                    <Col md="auto">
                        <p>
                            <button
                                className="btn default"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseExample"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                                onClick={openModal}
                            >
                                add course to plan
                            </button>
                        </p>
                    </Col>
                    <Col md="auto">
                        <p>
                            <button
                                className="btn default"
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
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ViewCourseInfo />
                    </Col>
                </Row>
            </Container>
            {showModal ? (
                <AddCourseToPlan
                    newCourse={course}
                    plans={plans}
                    show={showModal}
                ></AddCourseToPlan>
            ) : null}
        </div>
    );
}
