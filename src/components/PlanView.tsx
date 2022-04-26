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
    const [allCourses, setAllCourses] = useState({
        semesters: plan.semesters,
        coursePool: plan.plan_pool
    });
    const [newsem, setnewsem] = useState<boolean>(false);
    const [moveCourse, setMoveCourse] = useState<boolean>(false);
    function updatenewsem() {
        setnewsem(!newsem);
    }
    function updateplan_credits() {
        console.log("hi");
    }
    const courses = allCourses.semesters.map(
        (sem: Semester): Course[] => sem.courses
    );
    let sum = 0;
    if (courses.length > 0) {
        const indv_courses = courses.reduce(
            (currArr: Course[], c: Course[]) => currArr.concat(c),
            []
        );
        const courses_as_nums = indv_courses.map((c: Course): number =>
            parseInt(c.course_credits.trim().charAt(0))
        );
        sum = courses_as_nums.reduce(
            (currentTotal: number, credits: number) => currentTotal + credits
        );
    }
    const [plan_credits, setplan_credits] = useState<number>(sum);
    function removeSemester(termyear: string) {
        const newsemesters = [...allCourses.semesters].filter(
            (sem: Semester): boolean => sem.session + ":" + sem.year != termyear
        );
        setAllCourses({
            semesters: newsemesters,
            coursePool: allCourses.coursePool
        });
    }
    function addSemester() {
        const newSemester = {
            courses: [],
            year: year,
            session: session,
            semester_credits: 0
        };
        const newSemesterList = [...allCourses.semesters, newSemester];
        setAllCourses({
            semesters: newSemesterList,
            coursePool: allCourses.coursePool
        });
    }
    function updateyear(event: ChangeEvent) {
        const inputToNumber = parseInt(event.target.value);
        setyear(inputToNumber);
    }
    function updatesession(event: ChangeEvent) {
        setsession(event.target.value);
    }
    function completeMove(moving: string, origin: string, destination: string) {
        /*
        origin = {
            ...origin,
            courses: [...origin.courses.splice(moving_index, 1)]
        };
        const len = destination.courses.length;
        destination = {
            ...destination,
            courses: [...destination.courses.splice(len, 0, moving)]
        };*/
        if (destination === origin) {
            //Do Nothing
            setAllCourses({
                semesters: [...allCourses.semesters],
                coursePool: [...allCourses.coursePool]
            });
        } else if (origin === "Course_Pool") {
            // Move from Course Pool to Selected Semester
            let origin_final = allCourses.coursePool;
            const moving_index = origin_final.findIndex(
                (course: Course): boolean => course.code === moving
            );
            const moving_course = origin_final[moving_index];
            let destination_final =
                allCourses.semesters[
                    allCourses.semesters.findIndex(
                        (semester: Semester): boolean =>
                            semester.session + ":" + semester.year ===
                            destination
                    )
                ];
            origin_final = [...origin_final.splice(moving_index, 1)];
            const len = destination_final.courses.length;
            destination_final = {
                ...destination_final,
                courses: [
                    ...destination_final.courses.splice(len, 0, moving_course)
                ]
            };
            setAllCourses({
                semesters: [...allCourses.semesters],
                coursePool: [...allCourses.coursePool]
            });
        } else if (destination === "Course_Pool") {
            // Move from Selected Semester to course pool
            let origin_final =
                allCourses.semesters[
                    allCourses.semesters.findIndex(
                        (semester: Semester): boolean =>
                            semester.session + ":" + semester.year === origin
                    )
                ];
            const moving_index = origin_final.courses.findIndex(
                (course: Course): boolean => course.code === moving
            );
            let destination_final = allCourses.coursePool;
            origin_final = {
                ...origin_final,
                courses: [...origin_final.courses.splice(moving_index, 1)]
            };
            const moving_course = origin_final.courses[moving_index];
            const len = destination_final.length;
            destination_final = [
                ...destination_final.splice(len, 0, moving_course)
            ];
            setAllCourses({
                semesters: [...allCourses.semesters],
                coursePool: [...allCourses.coursePool]
            });
        } else {
            let origin_final =
                allCourses.semesters[
                    allCourses.semesters.findIndex(
                        (semester: Semester): boolean =>
                            semester.session + ":" + semester.year === origin
                    )
                ];
            const moving_index = origin_final.courses.findIndex(
                (course: Course): boolean => course.code === moving
            );
            const moving_course = origin_final.courses[moving_index];
            let destination_final =
                allCourses.semesters[
                    allCourses.semesters.findIndex(
                        (semester: Semester): boolean =>
                            semester.session + ":" + semester.year ===
                            destination
                    )
                ];
            origin_final = {
                ...origin_final,
                courses: [...origin_final.courses.splice(moving_index, 1)]
            };
            const len = destination_final.courses.length;
            destination_final = {
                ...destination_final,
                courses: [
                    ...destination_final.courses.splice(len, 0, moving_course)
                ]
            };
            setAllCourses({
                semesters: [...allCourses.semesters],
                coursePool: [...allCourses.coursePool]
            });
        }
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
                    semesters={allCourses.semesters}
                    plan_pool={allCourses.coursePool}
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
                    semesters={allCourses.semesters}
                    removesem={removeSemester}
                    updateplan_credits={updateplan_credits}
                ></SemesterList>
            </h6>
            <div>
                <CoursePool plan_pool={allCourses.coursePool}></CoursePool>
            </div>
        </div>
    );
}
