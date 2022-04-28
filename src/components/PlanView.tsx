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
export function PlanView({
    plan,
    setplans
}: {
    plan: DegreePlan;
    setplans: (newPlans: DegreePlan[]) => void;
}): JSX.Element {
    const [year, setyear] = useState<number>(0);
    const [session, setsession] = useState<string>("");
    const [newsem, setnewsem] = useState<boolean>(false);
    const [moveCourse, setMoveCourse] = useState<boolean>(false);
    const [showPool, setShowPool] = useState<boolean>(false);

    function showCoursePool() {
        setShowPool(!showPool);
    }

    function updatenewsem() {
        setnewsem(!newsem);
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
