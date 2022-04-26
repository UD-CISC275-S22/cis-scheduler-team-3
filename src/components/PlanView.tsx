import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import { CourseMover } from "./CourseMover";
import { SemesterList } from "./SemesterList";
type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;
export function PlanView({ plan }: { plan: DegreePlan }): JSX.Element {
    const [year, setyear] = useState<number>(0);
    const [session, setsession] = useState<string>("");
    const [semesters, setsemesters] = useState<Semester[]>(plan.semesters);
    const [newsem, setnewsem] = useState<boolean>(false);
    const [moveCourse, setMoveCourse] = useState<boolean>(false);
    const s = plan.semesters;
    console.log(s);
    const courses = s.map((sem: Semester): Course[] => sem.courses);
    console.log(courses);
    let sum = 0;
    if (courses.length != 0) {
        const indv_courses = courses.reduce(
            (currArr: Course[], c: Course[]) => currArr.concat(c),
            []
        );
        console.log(indv_courses);
        const courses_as_nums = indv_courses.map((c: Course): number =>
            parseInt(c.course_credits.trim().charAt(0))
        );
        sum = courses_as_nums.reduce(
            (currentTotal: number, credits: number) => currentTotal + credits
        );
    }

    const [plan_credits, setplan_credits] = useState<number>(sum);
    function updateplan_credits(credit: number) {
        setplan_credits(plan_credits + credit);
    }
    function updatenewsem() {
        setnewsem(!newsem);
    }
    function removeSemester(termyear: string) {
        const delInd = semesters.findIndex(
            (sem: Semester): boolean =>
                sem.session + ":" + sem.year === termyear
        );
        const credits_lost = semesters[delInd].semester_credits;
        const new_credits = plan_credits - credits_lost;
        setplan_credits(new_credits);
        const newsemesters = [...semesters].filter(
            (sem: Semester): boolean => sem.session + ":" + sem.year != termyear
        );
        setsemesters(newsemesters);
    }
    function addSemester() {
        const newSemester = {
            courses: [],
            year: year,
            session: session,
            semester_credits: 0
        };
        const newSemesterList = [...semesters, newSemester];
        setsemesters(newSemesterList);
    }
    function updateyear(event: ChangeEvent) {
        const inputToNumber = parseInt(event.target.value);
        setyear(inputToNumber);
    }
    function updatesession(event: ChangeEvent) {
        setsession(event.target.value);
    }
    function completeMove(
        moving: Course,
        origin: Semester,
        destination: Semester
    ) {
        const moving_index = origin.courses.findIndex(
            (course: Course): boolean => course.code === moving.code
        );
        origin = {
            ...origin,
            courses: [...origin.courses.splice(moving_index, 1)]
        };
        const len = destination.courses.length;
        destination = {
            ...destination,
            courses: [...destination.courses.splice(len, 0, moving)]
        };
        setsemesters([...semesters]);
    }
    return (
        <div data-testid="degree-plan">
            <h4 data-testid="name">{plan.name}</h4>
            <h6 data-testid="start-year">Start Year: {plan.Start_Year}</h6>
            <h6 data-testid="end-year">End Year: {plan.End_Year}</h6>
            <h6 data-testid="degree-credits">Degree Credits: {plan_credits}</h6>
            <Button
                className="Buttons"
                onClick={() => setMoveCourse(!moveCourse)}
            >
                Move Courses
            </Button>
            {moveCourse ? (
                <CourseMover
                    semesters={semesters}
                    completeMove={completeMove}
                ></CourseMover>
            ) : null}
            <p> </p>
            <div>
                <Button
                    className="Buttons"
                    variant="success"
                    onClick={() => updatenewsem()}
                    data-testid="add-semester-btn"
                >
                    Add Semester
                </Button>
                <p> </p>
                {newsem ? (
                    <>
                        <Form.Group>
                            <Form.Label>
                                Semester Session (Fall, Winter, Spring, Summer):
                            </Form.Label>
                            <Form.Control
                                value={session}
                                onChange={updatesession}
                            ></Form.Control>
                            <Form.Label>Semester Year: </Form.Label>
                            <Form.Control
                                value={year}
                                onChange={updateyear}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            size="sm"
                            variant="success"
                            onClick={() => addSemester()}
                            data-testid="add-btn2"
                        >
                            add
                        </Button>
                    </>
                ) : null}
            </div>
            <h6 data-testid="semester-list">
                <SemesterList
                    semesters={semesters}
                    removesem={removeSemester}
                    updateplan_credits={updateplan_credits}
                ></SemesterList>
            </h6>
        </div>
    );
}
