import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import { CourseMover } from "./CourseMover";
import { SemesterList } from "./SemesterList";
import { CoursePool } from "./CoursePool";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;
export function PlanView({ plan }: { plan: DegreePlan }): JSX.Element {
    const [year, setyear] = useState<number>(0);
    const [session, setsession] = useState<string>("");
    const [semesters, setsemesters] = useState<Semester[]>(plan.semesters);
    const [newsem, setnewsem] = useState<boolean>(false);
    const [moveCourse, setMoveCourse] = useState<boolean>(false);
    const [coursepool, setCoursePool] = useState<Course[]>(plan.plan_pool);

    function updatenewsem() {
        setnewsem(!newsem);
    }
    function removeSemester(termyear: string) {
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
    function completeMove(moving: string, origin: string, destination: string) {
        /*const moving_index = origin.courses.findIndex(
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
        };*/
        if (origin === destination) {
            console.log("DO NOTHING");
        } else if (origin === "Course_Pool") {
        } else if (destination === "Course_Pool") {
        } else {
            let origin_semester =
                semesters[
                    semesters.findIndex(
                        (semester: Semester): boolean =>
                            semester.session + ":" + semester.year === origin
                    )
                ];
            const moving_index = origin_semester.courses.findIndex(
                (course: Course): boolean => course.code === moving
            );
            const moving_course = origin_semester.courses[moving_index];
            let destination_semester =
                semesters[
                    semesters.findIndex(
                        (semester: Semester): boolean =>
                            semester.session + ":" + semester.year ===
                            destination
                    )
                ];
            origin_semester = {
                ...origin_semester,
                courses: [...origin_semester.courses.splice(moving_index, 1)]
            };
            const len = destination_semester.courses.length;
            destination_semester = {
                ...destination_semester,
                courses: [
                    ...destination_semester.courses.splice(
                        len,
                        0,
                        moving_course
                    )
                ]
            };
        }
        setsemesters([...semesters]);
    }
    return (
        <div data-testid="degree-plan">
            <h4 data-testid="name">{plan.name}</h4>
            <h6 data-testid="start-year">Start Year: {plan.Start_Year}</h6>
            <h6 data-testid="end-year">End Year: {plan.End_Year}</h6>
            <h6 data-testid="degree-credits">
                Degree Credits: {plan.degree_credits}
            </h6>
            <Button
                className="Buttons"
                onClick={() => setMoveCourse(!moveCourse)}
            >
                Move Courses
            </Button>
            {moveCourse ? (
                <CourseMover
                    semesters={semesters}
                    plan_pool={coursepool}
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
                ></SemesterList>
            </h6>
            <div>
                <CoursePool plan_pool={coursepool}></CoursePool>
            </div>
        </div>
    );
}
