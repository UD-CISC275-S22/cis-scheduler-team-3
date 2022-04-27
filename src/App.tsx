import React, { useState } from "react";
import "./App.css";
import { PlanList } from "./components/PlanList";
import { SAMPLE_PLANS } from "./interfaces/degreeplan";
import { DegreePlan } from "./interfaces/degreeplan";
import { Course } from "./interfaces/course";
import { Button, Form } from "react-bootstrap";
import { CoursePool } from "./components/CoursePool";
import POOL_DATA from "./data/course_catalog.json";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function App(): JSX.Element {
    const POOLCOURSES = POOL_DATA as Course[];
    const [plans, setplans] = useState<DegreePlan[]>(SAMPLE_PLANS);
    const [name, setname] = useState<string>("");
    const [start, setstart] = useState<number>(0);
    const [end, setend] = useState<number>(0);
    const [add, setadd] = useState<boolean>(false);
    const [showPool, setShowPool] = useState<boolean>(false);

    function updateAdd() {
        setadd(!add);
    }
    function addPlan() {
        const newPlan = {
            name: name,
            Start_Year: start,
            End_Year: end,
            semesters: [],
            degree_credits: 0,
            plan_pool: POOLCOURSES
        };
        const newPlanList = [...plans, newPlan];
        updateAdd();
        setplans(newPlanList);
    }
    function updateStart(event: ChangeEvent) {
        const inputToNumber = parseInt(event.target.value);
        setstart(inputToNumber);
    }
    function updateEnd(event: ChangeEvent) {
        const inputToNumber = parseInt(event.target.value);
        setend(inputToNumber);
    }
    function updateName(event: ChangeEvent) {
        setname(event.target.value);
    }
    function completeRemove(n: string) {
        const newplans = [...plans].filter(
            (dp: DegreePlan): boolean => dp.name != n
        );
        setplans(newplans);
    }

    function showCoursePool() {
        setShowPool(!showPool);
    }

    return (
        <>
            <div className="App">
                <header className="App-header">UD CIS Scheduler</header>
                <h6>
                    Group Members: Madison Holloway, John Neilson, & Sara Fleck
                </h6>
                <p> </p>
                <h5 className="Description">
                    Hello! Welcome to our UD CIS scheduler. In this app, you
                    will be able to map out different CIS degree plans. You can
                    add, edit, move, and delete semesters and courses as you see
                    fit.
                </h5>
            </div>
            <div>
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
                <div>
                    {showPool ? <CoursePool plans={plans}></CoursePool> : null}
                    <PlanList plans={plans} remove={completeRemove}></PlanList>
                </div>
            </div>
            <div>
                <Button
                    variant="success"
                    className="Delete-plan"
                    onClick={() => updateAdd()}
                    data-testid="add-plan-btn"
                >
                    Add Plan
                </Button>
            </div>
            {add ? (
                <div>
                    <Form.Group className="Add-Plan" data-testid="addNewPlan">
                        <Form.Label>Plan Name: </Form.Label>
                        <Form.Control
                            value={name}
                            onChange={updateName}
                        ></Form.Control>
                        <Form.Label>Start Year: </Form.Label>
                        <Form.Control
                            value={start}
                            onChange={updateStart}
                        ></Form.Control>
                        <Form.Label>End Year: </Form.Label>
                        <Form.Control
                            value={end}
                            onChange={updateEnd}
                        ></Form.Control>
                    </Form.Group>
                    <Button
                        className="me-3"
                        variant="success"
                        size="sm"
                        onClick={() => addPlan()}
                        data-testid="add-btn"
                    >
                        add
                    </Button>
                </div>
            ) : null}
            <p> </p>
            <hr></hr>
        </>
    );
}
export default App;
