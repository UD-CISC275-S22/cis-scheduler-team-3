import React, { useState } from "react";
import "./App.css";
import { PlanList } from "./components/PlanList";
import { DegreePlan } from "./interfaces/degreeplan";
import { Course } from "./interfaces/course";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import POOL_DATA from "./data/course_catalog.json";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

export function App(): JSX.Element {
    const POOLCOURSES = POOL_DATA as Course[];
    /*plans represents essentially the state of the app, there are multiple plans, each contains semesters, and courses
    plans and a function called editplans is passed down through the rest of our files to ensure everything is updated as 
    the user makes changes*/
    const [plans, setplans] = useState<DegreePlan[]>([]);
    const [name, setname] = useState<string>("");
    const [start, setstart] = useState<number>(0);
    const [end, setend] = useState<number>(0);
    const [add, setadd] = useState<boolean>(false);
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
        clearForm();
    }
    function clearForm() {
        setname("");
        setstart(0);
        setend(0);
    }
    function deletePlan(id: string) {
        setplans(plans.filter((plan: DegreePlan): boolean => plan.name != id));
    }
    function editPlan(id: string, newPlan: DegreePlan) {
        setplans(
            plans.map(
                (plan: DegreePlan): DegreePlan =>
                    plan.name === id ? newPlan : plan
            )
        );
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

    return (
        <>
            <div className="App">
                <header className="App-header">UD CIS Scheduler</header>
                <h6>
                    Group Members: Madison Holloway, John Neilson, & Sara Fleck
                </h6>
                <p> </p>
                <h5 className="Description">
                    Hello! Welcome to our scheduler. In this app, you will be
                    able to map out different CIS degree plans. Click Add Plan
                    to get started!
                </h5>
            </div>
            <div>
                <PlanList
                    plans={plans}
                    editplan={editPlan}
                    deleteplan={deletePlan}
                ></PlanList>
            </div>
            <p> </p>
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
                <Container>
                    <Row>
                        <Form.Group
                            className="Add-Plan"
                            data-testid="addNewPlan"
                        >
                            <Form.Label>Plan Name: </Form.Label>
                            <Form.Control
                                value={name}
                                onChange={updateName}
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Start Year: </Form.Label>
                            <Form.Control
                                value={start}
                                onChange={updateStart}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>End Year: </Form.Label>
                            <Form.Control
                                value={end}
                                onChange={updateEnd}
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                    <p></p>
                    <Button
                        className="me-3"
                        variant="success"
                        size="sm"
                        onClick={() => addPlan()}
                        data-testid="add-btn"
                    >
                        add
                    </Button>
                </Container>
            ) : null}
            <p> </p>
            <hr></hr>
        </>
    );
}
export default App;
