import React, { useState } from "react";
import "./App.css";
import { PlanList } from "./components/PlanList";
import { CoursePool } from "./components/CoursePool";
import { SAMPLE_PLANS } from "./interfaces/degreeplan";
import { DegreePlan } from "./interfaces/degreeplan";
import { Button, Form } from "react-bootstrap";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;

function App(): JSX.Element {
    const [plans, setplans] = useState<DegreePlan[]>(SAMPLE_PLANS);
    const [name, setname] = useState<string>("");
    const [start, setstart] = useState<number>(0);
    const [end, setend] = useState<number>(0);
    const [add, setadd] = useState<boolean>(false);
    const [remove, setremove] = useState<boolean>(false);
    const [plan, setplan] = useState<DegreePlan>(plans[0]);
    let flag = true;
    function updateRemove() {
        setremove(!remove);
    }
    function updateAdd() {
        setadd(!add);
    }
    function addPlan() {
        const newPlan = {
            name: name,
            Start_Year: start,
            End_Year: end,
            semesters: [],
            degree_credits: 0
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
    function updatePlan(event: React.ChangeEvent<HTMLSelectElement>) {
        const chosenInd = plans.findIndex(
            (plan: DegreePlan): boolean => plan.name === event.target.value
        );
        setplan(plans[chosenInd]);
    }
    function deletePlan() {
        if (plans.length === 0) {
            setplans([]);
            flag = false;
        } else {
            const delInd = plans.findIndex(
                (Plan: DegreePlan): boolean => Plan.name === plan.name
            );
            plans.splice(delInd, 1);
            setplans([...plans]);
        }
    }

    return (
        <>
            <div className="App">
                <header className="App-header">CIS Scheduler</header>
                <h6>
                    Group Members: Madison Holloway, John Neilson, & Sara Fleck
                </h6>
                <p> </p>
                <h5 className="Description">
                    Hello! Welcome to our CIS scheduler. In this app, you will
                    be able to map out different CIS degree plans. At the top,
                    you can see a pool of typical courses at UD. You can add to
                    and edit these courses as you see fit. Below, you may
                    construct and edit your semesters all while making sure
                    requirements for graduation are met.
                </h5>
            </div>
            <div>
                <CoursePool></CoursePool>
                {flag ? <PlanList plans={plans}></PlanList> : null}
            </div>
            <div>
                <Button
                    variant="success"
                    className="Delete-plan"
                    onClick={() => updateAdd()}
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
                    >
                        add
                    </Button>
                </div>
            ) : null}
            <Button
                className="Delete-plan"
                variant="warning"
                onClick={() => updateRemove()}
            >
                Remove Plan
            </Button>
            <p> </p>
            {remove ? (
                <div>
                    <Form.Group className="Delete-plan">
                        <Form.Label>Select Plan to Delete:</Form.Label>
                        <Form.Select
                            value={plans[0].name}
                            onChange={updatePlan}
                        >
                            <option></option>
                            {plans.map((plan: DegreePlan) => (
                                <option key={plan.name} value={plan.name}>
                                    {plan.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deletePlan()}
                    >
                        Delete Plan
                    </Button>
                </div>
            ) : null}
            <hr></hr>
        </>
    );
}
export default App;
