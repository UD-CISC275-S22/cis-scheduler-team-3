import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { CoursePool } from "./CoursePool";
import { SemesterList } from "./SemesterList";
import { CourseMover } from "./CourseMover";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
/* this function generates a container with all the plan information such as:
    plan name, start/end year, degree credits. User can add & clear semesters.
    Complete move function doesn't currently work, so move courses button isn't usable */
export function PlanView({
    plan,
    editplan
}: {
    plan: DegreePlan;
    editplan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    const [showPool, setShowPool] = useState<boolean>(false);
    const [add, setadd] = useState<boolean>(false);
    const [year, setyear] = useState<number>(0);
    const [session, setsession] = useState<string>("");
    const [movecourse, setmovecourse] = useState<boolean>(false);

    function updatemovecourse() {
        setmovecourse(!movecourse);
    }
    function updateadd() {
        setadd(!add);
    }
    function updateSession(event: React.ChangeEvent<HTMLInputElement>) {
        setsession(event.target.value);
    }
    function updateYear(event: React.ChangeEvent<HTMLInputElement>) {
        const inputToNumber = parseInt(event.target.value);
        setyear(inputToNumber);
    }
    function showCoursePool() {
        setShowPool(!showPool);
    }
    function clearSemesters() {
        const newplan = {
            ...plan,
            semesters: []
        };
        editplan(plan.name, newplan);
    }
    function addSemester() {
        const newSemester = {
            courses: [],
            year: year,
            session: session,
            semester_credits: 0
        };
        const new_semesters = [...plan.semesters, newSemester];
        const newplan = {
            ...plan,
            semesters: new_semesters
        };
        editplan(plan.name, newplan);
        updateadd();
    }
    function completeMove(
        course_code: string,
        origin: string,
        destination: string
    ) {
        console.log(course_code, origin, destination);
        if (destination === origin) {
            // If the origin and destination are the same do nothing
            return null;
        } else if (origin === "Course_Pool") {
            // Origin is the coursepool
            console.log("Origin: Course_Pool");
            console.log("Destination:" + destination);
            const index = plan.plan_pool.findIndex(
                (course: Course): boolean =>
                    course.code + ":" + course.title === course_code
            );
            const moving_course = plan.plan_pool[index];
            plan.plan_pool = plan.plan_pool.filter(
                (course: Course): boolean =>
                    course.title + ":" + course.code != course_code
            );
            const semester_accepting_index = plan.semesters.findIndex(
                (semester: Semester): boolean =>
                    semester.session + ":" + semester.year === destination
            );
            const sem_courses =
                plan.semesters[semester_accepting_index].courses;
            const new_semester = {
                ...plan.semesters[semester_accepting_index],
                courses: [...sem_courses, moving_course]
            };
            const new_semesters = [
                ...plan.semesters.filter(
                    (semester: Semester): boolean =>
                        semester.session + ":" + semester.year !=
                        new_semester.session + ":" + new_semester.year
                ),
                new_semester
            ];
            const newplan = {
                ...plan,
                semesters: new_semesters
            };
            console.log(newplan);
            console.log("Final log of move");
            editplan(plan.name, newplan);
        } else if (destination === "Course_Pool") {
            // Destination of moving course is the coursepool
            console.log("Origin: " + origin);
            console.log("Destination: Course_Pool");
        } else {
            // Origin and destination do not involve the coursepool
            console.log("Destination: " + origin);
            console.log("Destination: " + destination);
        }
    }
    return add ? (
        <div>
            <Form.Group controlId="session-textbox">
                <Form.Label>
                    Enter the session (fall, winter, spring, summer):
                </Form.Label>
                <Form.Control
                    value={session}
                    onChange={updateSession}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="year-textbox">
                <Form.Label>Enter the year:</Form.Label>
                <Form.Control value={year} onChange={updateYear}></Form.Control>
            </Form.Group>
            <Button
                data-testid="save-sem"
                size="sm"
                onClick={() => addSemester()}
            >
                add
            </Button>
        </div>
    ) : (
        <div data-testid="degree-plan">
            <h4 data-testid="name">{plan.name}</h4>
            <h6 data-testid="start-year">Start Year: {plan.Start_Year}</h6>
            <h6 data-testid="end-year">End Year: {plan.End_Year}</h6>
            <h6 data-testid="degree-credits">
                Degree Credits: {plan.degree_credits}/ 124 required
            </h6>
            <Button
                data-testid="clear-sem-btn"
                className="Buttons"
                variant="warning"
                onClick={() => clearSemesters()}
            >
                Clear Semesters
            </Button>
            <p></p>
            <Button
                data-testid="add-sem-btn"
                className="Buttons"
                variant="success"
                onClick={() => updateadd()}
            >
                Add Semester
            </Button>
            <p></p>
            <Button className="Buttons" onClick={updatemovecourse}>
                move courses
            </Button>
            {movecourse ? (
                <CourseMover
                    semesters={plan.semesters}
                    plan_pool={plan.plan_pool}
                    completeMove={completeMove}
                ></CourseMover>
            ) : null}
            <SemesterList plan={plan} editplan={editplan}></SemesterList>
            <div className="show-course-pool-button">
                <Button
                    data-testid="show-pool-btn"
                    variant="success"
                    size="sm"
                    onClick={showCoursePool}
                    className="show-course-pool-button"
                >
                    {showPool
                        ? "Hide Pool of CISC-related courses"
                        : "Show Pool of CISC-related courses"}
                </Button>
            </div>
            {showPool ? (
                <CoursePool plan_pool={plan.plan_pool}></CoursePool>
            ) : null}
        </div>
    );
}
