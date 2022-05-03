import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/course";
/* function that generates the view for each course in the course pool, can use show/hide to see course info*/
export function CoursePoolTable({ course }: { course: Course }): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const [style, setStyle] = useState<string>("collapse hide");

    function checkPrerequisites(): boolean {
        const isEmptyString = course.prerequisites?.length === 0;
        return isEmptyString;
    }

    const toggleRow = () => {
        console.log(course.code);
        setOpen(!open);
        open ? setStyle("collapse hide") : setStyle("collapse show");
    };

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
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ViewCourseInfo />
                </Col>
            </Row>
        </Container>
    );
}
