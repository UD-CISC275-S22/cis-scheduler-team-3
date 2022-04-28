import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreeplan";
import { CourseList } from "./CourseList";

export function SemesterView({
    semester,
    plan,
    editplan
}: {
    semester: Semester;
    plan: DegreePlan;
    editplan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    function addCourse() {
        const random_code = Math.floor(Math.random() * 100);
        const newCourse = {
            code: "" + random_code,
            title: "Edit course info",
            description: "",
            course_credits: "",
            prerequisites: "",
            requirement: false
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
        editplan(plan.name, new_plan);
    }
    return (
        <Container data-testid="Semester">
            <Row>
                <Col>
                    <h5 data-testid="Semester_Title">
                        {semester.session}:{semester.year}
                    </h5>
                    <i data-testid="Semester_Credits">
                        Total Credits: {semester.semester_credits}
                    </i>
                    <p> </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button size="sm" onClick={() => addCourse()}>
                        add course
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CourseList
                        courses={semester.courses}
                        semester={semester}
                        plan={plan}
                        editplan={editplan}
                    ></CourseList>
                </Col>
            </Row>
        </Container>
    );
}
