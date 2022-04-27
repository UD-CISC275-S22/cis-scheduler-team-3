import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { CourseList } from "./CourseList";
import { ValidateNewCourse } from "./NewCourse";
import { Course } from "../interfaces/course";

export function SemesterView({
    semester,
    updateplan_credits
}: {
    semester: Semester;
    updateplan_credits: (credit: number) => void;
}): JSX.Element {
    const [newCourse, setNewCourse] = useState<boolean>(false);
    const [removeCourse, setRemoveCourse] = useState<boolean>(false);
    const [semesterCourses, setSemesterCourses] = useState<Course[]>(
        semester.courses
    );
    const courses = semester.courses;
    //the following code block calculates the original total semester credits
    const course_credits_as_nums = courses.map((c: Course): number =>
        parseInt(c.course_credits.trim().charAt(0))
    );
    let sum = 0;
    if (course_credits_as_nums.length > 0) {
        sum = course_credits_as_nums.reduce(
            (currentTotal: number, credits: number) => currentTotal + credits
        );
    }
    semester.semester_credits = sum;
    const [credits, setcredits] = useState<number>(sum);
    const [course, setCourse] = useState<Course>(semesterCourses[0]);
    //adds course to the Course array
    function createCourse(newCourse: Course) {
        console.log("made it to create course");
        console.log("new course title:" + newCourse.title);
        const credits_gained = parseInt(
            newCourse.course_credits.trim().charAt(0).charAt(0)
        );
        //updates the Semester credit total
        const new_credits = credits + credits_gained;
        semester.semester_credits = new_credits;
        updateplan_credits(credits_gained);
        setcredits(new_credits);
        semester.courses = [...semesterCourses, newCourse];
        setSemesterCourses([...semesterCourses, newCourse]);
    }
    //actually removes the course from the course array
    function deleteCourse() {
        if (semesterCourses.length === 1) {
            semester.semester_credits = 0;
            setcredits(0);
            setSemesterCourses([]);
        } else {
            const delInd = semesterCourses.findIndex(
                (c_course: Course): boolean => c_course.code === course.code
            );
            //geting the credits as an int from the string contained in the Course object
            let credit_amt_lost = parseInt(
                semesterCourses[delInd].course_credits
                    .trim()
                    .charAt(0)
                    .charAt(0)
            );
            //updating the Semester credit total
            credit_amt_lost = 0 - credit_amt_lost;
            const new_credits = credits + credit_amt_lost;
            semester.semester_credits = new_credits;
            updateplan_credits(credit_amt_lost);
            setcredits(new_credits);
            semester.courses = [
                ...semesterCourses.slice(0, delInd),
                ...semesterCourses.slice(delInd + 1)
            ];
            setSemesterCourses([
                ...semesterCourses.slice(0, delInd),
                ...semesterCourses.slice(delInd + 1)
            ]);
        }
    }
    //used for finding the course the user selected in the delete course dropdown
    function updateCourse(event: React.ChangeEvent<HTMLSelectElement>) {
        const chosenInd = semesterCourses.findIndex(
            (course: Course): boolean => course.code === event.target.value
        );
        setCourse(semesterCourses[chosenInd]);
    }
    //set semester courses to be empty
    function clearCourses() {
        setSemesterCourses([]);
    }

    return (
        <Container data-testid="Semester">
            <Row>
                <Col>
                    <h5 data-testid="Semester_Title">
                        {semester.session}:{semester.year}
                    </h5>
                    <i data-testid="Semester_Credits">
                        Total Credits: {credits}
                    </i>
                    <p> </p>
                    <Row>
                        <Button
                            className="Buttons"
                            variant="outline-dark"
                            onClick={() => setNewCourse(!newCourse)}
                        >
                            Add Course to Semester
                        </Button>
                        {newCourse ? (
                            <ValidateNewCourse
                                createCourse={createCourse}
                            ></ValidateNewCourse>
                        ) : null}
                        <p> </p>
                    </Row>
                    <Row>
                        <Button
                            data-testid="Remove Toggle"
                            className="Buttons"
                            variant="outline-dark"
                            onClick={() => setRemoveCourse(!removeCourse)}
                        >
                            Remove Course from Semester
                        </Button>
                        <p> </p>
                        {removeCourse ? (
                            <div>
                                <Form.Group>
                                    <Form.Label>
                                        Select Course to Delete
                                    </Form.Label>
                                    <Form.Select
                                        value={course.code}
                                        onChange={updateCourse}
                                    >
                                        {semesterCourses.map(
                                            (course: Course) => (
                                                <option
                                                    data-testid={course.code}
                                                    key={course.code}
                                                    value={course.code}
                                                >
                                                    {course.code}:{course.title}
                                                </option>
                                            )
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                <Button
                                    data-testid="Remove Confirm"
                                    className="Buttons"
                                    variant="outline-dark"
                                    onClick={deleteCourse}
                                >
                                    Delete Course
                                </Button>
                                <p> </p>
                            </div>
                        ) : null}
                        <Button
                            className="Buttons"
                            variant="outline-dark"
                            onClick={clearCourses}
                        >
                            Clear Courses
                        </Button>
                        <p> </p>
                    </Row>
                    <CourseList courses={semesterCourses}></CourseList>
                </Col>
            </Row>
        </Container>
    );
}
