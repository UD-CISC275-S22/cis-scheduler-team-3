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
    editplan,
    downloadPlan
}: {
    plan: DegreePlan;
    editplan: (id: string, newPlan: DegreePlan) => void;
    downloadPlan: (plan: DegreePlan) => void;
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
        if (isNaN(parseInt(event.target.value))) {
            setyear(0);
        } else {
            const inputToNumber = parseInt(event.target.value);
            setyear(inputToNumber);
        }
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
        setyear(0);
        setsession("");
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
            const origin_final = plan.plan_pool;
            const destination_index = plan.semesters.findIndex(
                (semester: Semester): boolean =>
                    semester.session + ":" + semester.year === destination
            );
            const destination_final = plan.semesters[destination_index];
            const moving_index = plan.plan_pool.findIndex(
                (course: Course): boolean => course.code === course_code
            );
            const moving_course = origin_final[moving_index];
            destination_final.courses.splice(
                destination_final.courses.length,
                0,
                moving_course
            );
            origin_final.splice(moving_index, 1);
            plan.semesters.splice(destination_index, 1, destination_final);
            const new_deg_credits =
                plan.degree_credits + moving_course.course_credits;
            const new_semester_credits =
                destination_final.semester_credits +
                moving_course.course_credits;
            plan.semesters[destination_index].semester_credits =
                new_semester_credits;
            const newplan = {
                ...plan,
                semesters: [...plan.semesters],
                plan_pool: [...origin_final],
                degree_credits: new_deg_credits
            };
            editplan(plan.name, newplan);
        } else if (destination === "Course_Pool") {
            // Destination of moving course is the coursepool
            const origin_index = plan.semesters.findIndex(
                (semester: Semester): boolean =>
                    semester.session + ":" + semester.year === origin
            );
            const origin_final = plan.semesters[origin_index];
            const moving_index = origin_final.courses.findIndex(
                (course: Course): boolean => course.code === course_code
            );
            const destination_final = [
                ...plan.plan_pool,
                origin_final.courses[moving_index]
            ];
            origin_final.courses.splice(moving_index, 1);
            plan.semesters.splice(origin_index, 1, origin_final);
            //updating the credits
            plan.degree_credits =
                plan.degree_credits -
                origin_final.courses[moving_index].course_credits;
            const new_semester_credits =
                origin_final.semester_credits -
                origin_final.courses[moving_index].course_credits;
            plan.semesters[origin_index].semester_credits =
                new_semester_credits;
            const newplan = {
                ...plan,
                semesters: [...plan.semesters],
                plan_pool: [...destination_final]
            };
            editplan(plan.name, newplan);
        } else {
            // Origin and destination do not involve the coursepool
            const origin_index = plan.semesters.findIndex(
                (semester: Semester): boolean =>
                    semester.session + ":" + semester.year === origin
            );
            const destination_index = plan.semesters.findIndex(
                (semester: Semester): boolean =>
                    semester.session + ":" + semester.year === destination
            );
            const origin_final = plan.semesters[origin_index];
            const destination_final = plan.semesters[destination_index];
            const moving_index = origin_final.courses.findIndex(
                (course: Course): boolean => course.code === course_code
            );
            const moving_course = origin_final.courses[moving_index];
            //updating the credits
            plan.semesters[destination_index].semester_credits =
                plan.semesters[destination_index].semester_credits +
                moving_course.course_credits;
            plan.semesters[origin_index].semester_credits =
                plan.semesters[origin_index].semester_credits -
                moving_course.course_credits;
            destination_final.courses.splice(
                destination_final.courses.length,
                0,
                moving_course
            );
            origin_final.courses.splice(moving_index, 1);
            plan.semesters
                .splice(origin_index, 1, origin_final)
                .splice(destination_index, 1, destination_final);
            const newplan = {
                ...plan,
                semesters: [...plan.semesters]
            };
            editplan(plan.name, newplan);
        }
    }
    return add ? (
        <div>
            <Form.Group controlId="session-textbox">
                <Form.Label>What session?:</Form.Label>
                <Form.Select value={session} onChange={updateSession}>
                    <option value="">Select an option</option>
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
            <p>
                University Requirements: ENGL110, First year seminar, Discovery
                Learning Experience, Multicultural, University Breadth (3), &
                Capstone{" "}
            </p>
            <p>College Requirements: 9 additional breadth credits </p>
            <p>
                Major Requirements: Core, Capstone, Science, 300 level or above
                math class, ENGL312 or ENGL 410, & CISC355
            </p>
            <Button
                data-testid="add-sem-btn"
                className="Buttons"
                variant="outline-success"
                onClick={() => updateadd()}
            >
                Add Semester
            </Button>
            <Button
                data-testid="clear-sem-btn"
                className="Buttons"
                variant="outline-primary"
                onClick={() => clearSemesters()}
            >
                Clear Semesters
            </Button>
            <Button
                className="Buttons"
                onClick={updatemovecourse}
                variant="outline-dark"
            >
                move courses
            </Button>
            {movecourse ? (
                <CourseMover
                    semesters={plan.semesters}
                    plan_pool={plan.plan_pool}
                    completeMove={completeMove}
                ></CourseMover>
            ) : null}
            <Button
                className="Buttons"
                onClick={() => downloadPlan(plan)}
                variant="outline-dark"
            >
                Export to CSV
            </Button>
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
