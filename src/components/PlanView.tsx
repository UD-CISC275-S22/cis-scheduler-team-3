import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import { CourseMover } from "./CourseMover";
import { CoursePool } from "./CoursePool";
import { SemesterList } from "./SemesterList";

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
    const [showPool, setShowPool] = useState<boolean>(false);

    function showCoursePool() {
        setShowPool(!showPool);
    }

    function updatenewsem() {
        setnewsem(!newsem);
    }
    //changes plan credits based on state of courses (deleted course credits go in as a negative)
    function updateplan_credits(credits: number) {
        const new_credits = plan_credits + credits;
        setplan_credits(new_credits);
    }
    //creates an array of course arrays
    const courses = allCourses.semesters.map(
        (sem: Semester): Course[] => sem.courses
    );
    let sum = 0;
    if (courses.length > 0) {
        //converts 2D array to one long array of course objects
        const indv_courses = courses.reduce(
            (currArr: Course[], c: Course[]) => currArr.concat(c),
            []
        );
        //converts course objects to array of numbers representing credits
        const courses_as_nums = indv_courses.map((c: Course): number =>
            parseInt(c.course_credits.trim().charAt(0))
        );
        //sums credits
        if (courses_as_nums.length > 0) {
            sum = courses_as_nums.reduce(
                (currentTotal: number, credits: number) =>
                    currentTotal + credits
            );
        }
    }
    //set plan_credits initial value to sum calculated above
    const [plan_credits, setplan_credits] = useState<number>(sum);
    //actually removes semester from the array based on id obtained from SemesterView
    function removeSemester(termyear: string) {
        const newsemesters = [...allCourses.semesters].filter(
            (sem: Semester): boolean => sem.session + ":" + sem.year != termyear
        );
        //same logic as above to update plan_credits
        const courses = newsemesters.map(
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
                (currentTotal: number, credits: number) =>
                    currentTotal + credits
            );
        }
        setplan_credits(sum);
        setAllCourses({
            semesters: newsemesters,
            coursePool: allCourses.coursePool
        });
    }
    //actually adds a semester to the array
    function addSemester() {
        const newSemester = {
            courses: [],
            year: year,
            session: session,
            semester_credits: 0
        };
        const newSemesterList = [...allCourses.semesters, newSemester];
        //same logic as above to calculate plan credit total
        const courses = newSemesterList.map(
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
            if (courses_as_nums.length > 0) {
                sum = courses_as_nums.reduce(
                    (currentTotal: number, credits: number) =>
                        currentTotal + credits
                );
            }
        }
        setplan_credits(sum);
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
        console.log(event.target.value);
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
            const credits = parseInt(
                moving_course.course_credits.trim().charAt(0)
            );
            updateplan_credits(credits);
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
            const credits =
                0 - parseInt(moving_course.course_credits.trim().charAt(0));
            updateplan_credits(credits);
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
            console.log(
                "Semester 1 courses:" + allCourses.semesters[0].courses.length
            );
            console.log(
                "Semester 2 courses:" + allCourses.semesters[1].courses.length
            );
            setAllCourses({
                semesters: [...allCourses.semesters],
                coursePool: [...allCourses.coursePool]
            });
        }
    }
    function clearSemesters() {
        setAllCourses({
            semesters: [],
            coursePool: [...allCourses.coursePool]
        });
        setplan_credits(0);
    }
    return (
        <div data-testid="degree-plan">
            <h4 data-testid="name">{plan.name}</h4>
            <h6 data-testid="start-year">Start Year: {plan.Start_Year}</h6>
            <h6 data-testid="end-year">End Year: {plan.End_Year}</h6>
            <h6 data-testid="degree-credits">
                Degree Credits: {plan_credits}/ 124 required
            </h6>
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
                            <Form.Label>Semester Session:</Form.Label>
                            <Form.Select
                                value={session}
                                onChange={updatesession}
                            >
                                <option> </option>
                                <option value={"Fall"}>Fall</option>
                                <option value={"Winter"}>Winter</option>
                                <option value={"Spring"}>Spring</option>
                                <option value={"Summer"}>Summer</option>
                            </Form.Select>
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
            <Button
                data-testid="clear-sem-btn"
                className="Buttons"
                variant="warning"
                onClick={() => clearSemesters()}
            >
                Clear Semesters
            </Button>
            <h6 data-testid="semester-list">
                <SemesterList
                    semesters={allCourses.semesters}
                    removesem={removeSemester}
                    updateplan_credits={updateplan_credits}
                ></SemesterList>
                <div className="show-course-pool-button">
                    <Button
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
            </h6>
        </div>
    );
}
