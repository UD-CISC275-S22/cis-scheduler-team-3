import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { SemesterList } from "./SemesterList";
import { CourseMover } from "./CourseMover";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
/* this function generates a container with all the plan information such as:
    plan name, start/end year, degree credits. User can add & clear semesters.
    Complete move function doesn't currently work, so move courses button isn't usable */
export function PlanView({
    plan,
    editPlan,
    downloadPlan
}: {
    plan: DegreePlan;
    editPlan: (id: string, newPlan: DegreePlan) => void;
    downloadPlan: (plan: DegreePlan) => void;
}): JSX.Element {
    const [add, setAdd] = useState<boolean>(false);
    const [year, setYear] = useState<number>(0);
    const [session, setSession] = useState<string>("");
    const [movecourse, setMovecourse] = useState<boolean>(false);
    const [showreq, setShowreq] = useState<boolean>(false);
    //state to check if semester being added is a duplicate
    const [invalidsem, setInvalidsem] = useState<boolean>(false);

    function updateShowReq() {
        setShowreq(!showreq);
    }
    //function to calculate which requirements are met/unmet
    function showRequirements(): string {
        const twoDcourses = plan.semesters.map(
            (semester: Semester): Course[] => semester.courses
        );
        let req = "";
        //check if there are any courses
        if (twoDcourses.length > 0) {
            const courses = twoDcourses.reduce(
                (courses: Course[], curr_courses: Course[]) =>
                    courses.concat(curr_courses)
            );
            //series of statements to check core requirements by course code
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "ENGL 110"
                ) >= 0
            ) {
                req = req + "Core: \n ENGL 110 ✔️ \n";
            } else {
                req = req + "Core: \n ENGL 110 ❌ \n";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "CISC 108"
                ) >= 0
            ) {
                req = req + "CISC 108 ✔️  \n";
            } else {
                req = req + "CISC 108 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "CISC 181"
                ) >= 0
            ) {
                req = req + "CISC 181 ✔️ \n ";
            } else {
                req = req + "CISC 181 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "CISC 210"
                ) >= 0
            ) {
                req = req + "CISC 210 ✔️ \n ";
            } else {
                req = req + "CISC 210 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "CISC 220"
                ) >= 0
            ) {
                req = req + "CISC 220 ✔️ \n ";
            } else {
                req = req + "CISC 220 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "CISC 260"
                ) >= 0
            ) {
                req = req + "CISC 260 ✔️ \n ";
            } else {
                req = req + "CISC 260 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "CISC 275"
                ) >= 0
            ) {
                req = req + "CISC 275 ✔️ \n ";
            } else {
                req = req + "CISC 275 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "CISC 303"
                ) >= 0
            ) {
                req = req + "CISC 303 ✔️ \n ";
            } else {
                req = req + "CISC 303 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "CISC 320"
                ) >= 0
            ) {
                req = req + "CISC 320 ✔️ \n ";
            } else {
                req = req + "CISC 320 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "CISC 361"
                ) >= 0
            ) {
                req = req + "CISC 361 ✔️ \n ";
            } else {
                req = req + "CISC 361 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "CISC 372"
                ) >= 0
            ) {
                req = req + "CISC 372 ✔️ \n ";
            } else {
                req = req + "CISC 372 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "CISC 355"
                ) >= 0
            ) {
                req = req + "CISC 355 ✔️ \n ";
            } else {
                req = req + "CISC 355 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "ENGL 312"
                ) >= 0 ||
                courses.findIndex(
                    (course: Course): boolean => course.code === "ENGL 410"
                ) >= 0
            ) {
                req = req + "ENGL 312/410 ✔️ \n ";
            } else {
                req = req + "ENGL312/410 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "MATH 205"
                ) >= 0 ||
                courses.findIndex(
                    (course: Course): boolean => course.code === "MATH 350"
                ) >= 0
            ) {
                req = req + "MATH 205/350 ✔️ \n ";
            } else {
                req = req + "MATH 205/350 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "MATH 210"
                ) >= 0
            ) {
                req = req + "MATH 210 ✔️ \n ";
            } else {
                req = req + "MATH 210 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "MATH 241"
                ) >= 0
            ) {
                req = req + "MATH 241 ✔️ \n ";
            } else {
                req = req + "MATH 241 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.code === "MATH 242"
                ) >= 0
            ) {
                req = req + "MATH 242 ✔️ \n ";
            } else {
                req = req + "MATH 242 ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean =>
                        course.requirement === "first year seminar"
                ) >= 0
            ) {
                req =
                    req +
                    "Additional University Requirements: \nFirst Year Seminar ✔️ \n ";
            } else {
                req =
                    req +
                    "Additional University Requirements: \nFirst Year Seminar ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean => course.requirement === "DLE"
                ) >= 0
            ) {
                req = req + "DLE ✔️ \n ";
            } else {
                req = req + "DLE ❌ \n ";
            }
            if (
                courses.findIndex(
                    (course: Course): boolean =>
                        course.requirement === "multicultural"
                ) >= 0
            ) {
                req = req + "Multicultural ✔️ \n ";
            } else {
                req = req + "Multicultural ❌ \n ";
            }
            if (
                courses.filter(
                    (course: Course): boolean =>
                        course.requirement == "university breadth"
                ).length >= 3
            ) {
                req = req + "University Breadth (3) ✔️ \n ";
            } else {
                req = req + "University Breadth (3) ❌ \n ";
            }
            if (
                courses.filter(
                    (course: Course): boolean =>
                        course.requirement == "capstone"
                ).length >= 2
            ) {
                req = req + "Capstone (2) ✔️ \n ";
            } else {
                req = req + "Capstone (2) ❌ \n ";
            }
            if (
                courses.filter(
                    (course: Course): boolean =>
                        course.requirement == "additional"
                ).length >= 3
            ) {
                req = req + "Additional Breadth (3) ✔️ \n ";
            } else {
                req = req + "Additional Breadth (3) ❌ \n ";
            }
            if (
                courses.filter(
                    (course: Course): boolean =>
                        course.requirement == "tech elective"
                ).length >= 2
            ) {
                req = req + "Tech Elective (2) ✔️ \n ";
            } else {
                req = req + "Tech Elective (2) ❌ \n ";
            }
            const science_courses = courses.filter(
                (course: Course): boolean =>
                    course.requirement == "tech elective"
            );
            const science_credits = science_courses.map(
                (course: Course): number => course.coursecredits
            );
            if (science_credits.length > 0) {
                const total_sci_credits = science_credits.reduce(
                    (totcred: number, cred: number) => (totcred += cred)
                );
                if (total_sci_credits >= 12) {
                    req = req + "Minimum 12 credits science ✔️ \n ";
                } else {
                    req = req + "Minimum 12 credits science ❌ \n ";
                }
            } else {
                req = req + "Minimum 12 credits science ❌ \n ";
            }
        } else {
            req =
                " None of the requirements have been met. Please add courses to semesters. \n";
        }
        return req;
    }

    function updateMovecourse() {
        setMovecourse(!movecourse);
    }
    //open add semester form view
    function updateAdd() {
        setAdd(!add);
    }
    function updateSession(event: React.ChangeEvent<HTMLSelectElement>) {
        setSession(event.target.value);
    }
    function updateYear(event: React.ChangeEvent<HTMLInputElement>) {
        if (isNaN(parseInt(event.target.value))) {
            setYear(0);
        } else {
            const inputToNumber = parseInt(event.target.value);
            setYear(inputToNumber);
        }
    }
    //make semester list empty array
    function clearSemesters() {
        const newplan = {
            ...plan,
            semesters: []
        };
        editPlan(plan.name, newplan);
    }
    //creates a new semester, then calls edit plan to update the state
    function addSemester() {
        if (
            plan.semesters.findIndex(
                (semester: Semester): boolean =>
                    semester.session + semester.year === session + year
            ) >= 0
        ) {
            setInvalidsem(true);
        } else {
            setInvalidsem(false);
            const newSemester = {
                courses: [],
                year: year,
                session: session,
                semestercredits: 0
            };
            const new_semesters = [...plan.semesters, newSemester];
            const newplan = {
                ...plan,
                semesters: new_semesters
            };
            editPlan(plan.name, newplan);
            setYear(0);
            setSession("");
            updateAdd();
        }
    }
    //completes the move of a course between different semesters, eventually calls edit plan to update the state
    function completeMove(
        course_code: string,
        origin: string,
        destination: string
    ) {
        if (destination === origin) {
            // If the origin and destination are the same do nothing
            return null;
        } else {
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
            plan.semesters[destination_index].semestercredits =
                plan.semesters[destination_index].semestercredits +
                moving_course.coursecredits;
            plan.semesters[origin_index].semestercredits =
                plan.semesters[origin_index].semestercredits -
                moving_course.coursecredits;
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
            editPlan(plan.name, newplan);
        }
    }
    return (
        <div data-testid="degree-plan">
            <h4 data-testid="name">{plan.name}</h4>
            <h6 data-testid="start-year">Start Year: {plan.startyear}</h6>
            <h6 data-testid="end-year">End Year: {plan.endyear}</h6>
            <h6 data-testid="degree-credits">
                Degree Credits: {plan.degreecredits}/ 124 required
            </h6>
            <Form.Check
                type="switch"
                data-testid="show/hide requirements"
                label="view requirements"
                onChange={updateShowReq}
                checked={showreq}
            />
            {showreq ? (
                <div style={{ whiteSpace: "pre-line" }}>
                    {showRequirements()}
                </div>
            ) : null}
            <Button
                data-testid="add-sem-btn"
                className="Buttons"
                variant="outline-success"
                onClick={() => updateAdd()}
            >
                ➕ Add Semester
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
                onClick={updateMovecourse}
                variant="outline-dark"
            >
                🔄 Move Courses
            </Button>
            {movecourse ? (
                <CourseMover
                    semesters={plan.semesters}
                    completeMove={completeMove}
                ></CourseMover>
            ) : null}
            <Button
                className="Buttons"
                onClick={() => downloadPlan(plan)}
                variant="outline-dark"
            >
                📂 Export to CSV
            </Button>
            {add ? (
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
                        <Form.Control
                            value={year}
                            onChange={updateYear}
                        ></Form.Control>
                    </Form.Group>
                    <Button
                        data-testid="save-sem"
                        size="sm"
                        onClick={() => addSemester()}
                    >
                        add
                    </Button>
                    {invalidsem ? (
                        <i> oops! semester already exists in this plan</i>
                    ) : null}
                </div>
            ) : null}
            <SemesterList plan={plan} editPlan={editPlan}></SemesterList>
        </div>
    );
}
