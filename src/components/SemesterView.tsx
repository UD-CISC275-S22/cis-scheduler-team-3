import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreeplan";
import { CourseList } from "./CourseList";
/*
this function displays a container with all the Semester data:
session, year, total credits, course list, and add course button
*/
export function SemesterView({
    semester,
    plan,
    editplan
}: {
    semester: Semester;
    plan: DegreePlan;
    editplan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    //function that generates an empty course with a random code and adds it to the semester & plan
    function addCourse() {
        const random_code = Math.floor(Math.random() * 999);
        const newCourse = {
            code: "" + random_code,
            title: "Edit course info",
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
        editplan(plan.name, new_plan);
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
                        onClick={() => addCourse()}
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
