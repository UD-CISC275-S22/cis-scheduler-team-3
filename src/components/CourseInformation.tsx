import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/course";
/* function that generates the view for each course in the course pool, can use show/hide to see course info*/
export function CourseInformation({ course }: { course: Course }): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const [style, setStyle] = useState<string>("collapse hide");

    function checkPrerequisites(): boolean {
        const isemptystring = course.prerequisites?.length === 0;
        return isemptystring;
    }
    function checkRequirement(): boolean {
        const isemptystring = course.requirement?.length === 0;
        return isemptystring;
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
                    <p>Credits: {course.coursecredits}</p>
                    <p>Description: {course.description}</p>
                    {checkPrerequisites() ? (
                        <p>Prerequisites: none</p>
                    ) : (
                        <p>Prerequisites: {course.prerequisites}</p>
                    )}
                    {checkRequirement() ? (
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
                <Col>
                    {" "}
                    <h6>
                        {course.code} : {course.title}
                    </h6>
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
