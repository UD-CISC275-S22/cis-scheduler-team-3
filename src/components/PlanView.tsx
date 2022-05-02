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
    function updateSession(event: React.ChangeEvent<HTMLSelectElement>) {
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
    function completeMove(course: Course, origin: string, destination: string) {
        console.log(course.code, origin, destination);
        if (destination === origin) {
            return null;
        } else if (origin === "Course_Pool") {
            const id = course.title + ":" + course.code;
            plan.plan_pool = plan.plan_pool.filter(
                (course: Course): boolean =>
                    course.title + ":" + course.code != id
            );
            console.log("destination: " + destination);
            const semester_accepting_index = plan.semesters.findIndex(
                (semester: Semester): boolean =>
                    semester.session + ":" + semester.year === destination
            );
            console.log("accepting sem index: " + semester_accepting_index);
            const sem_courses =
                plan.semesters[semester_accepting_index].courses;
            const new_semester = {
                ...plan.semesters[semester_accepting_index],
                courses: [...sem_courses, course]
            };
            console.log(
                "new semester courses length: " + new_semester.courses.length
            );
            console.log("course to be moved code: " + course.code);
            const new_semesters = [...plan.semesters, new_semester];
            const newplan = {
                ...plan,
                semesters: new_semesters
            };
            editplan(plan.name, newplan);
            updatemovecourse();
        }
    }
    return add ? (
        <div>
            <Form.Group controlId="session-textbox">
                <Form.Label>What session?:</Form.Label>
                <Form.Select value={session} onChange={updateSession}>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                </Form.Select>
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
