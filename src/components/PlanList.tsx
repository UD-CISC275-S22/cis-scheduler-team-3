import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { PlanView } from "./PlanView";
/*this function loops through the array of plans and calls PlanView for each plan object*/
export function PlanList({
    plans,
    editplan,
    deleteplan,
    saveData
}: {
    plans: DegreePlan[];
    editplan: (name: string, newPlan: DegreePlan) => void;
    deleteplan: (name: string) => void;
    saveData: () => void;
}): JSX.Element {
    function removeplan(plan: DegreePlan) {
        deleteplan(plan.name);
    }
    return (
        <Container data-testid="Plan-list">
            <Row>
                <h2>Plans:</h2>
                <hr />
                {plans.map((plan: DegreePlan) => (
                    <div
                        key={plan.Start_Year + plan.End_Year}
                        data-testid="plan"
                    >
                        <PlanView plan={plan} editplan={editplan}></PlanView>
                        <Button
                            className="me-3"
                            variant="outline-danger"
                            onClick={() => removeplan(plan)}
                            data-testid="delete-plan-btn"
                        >
                            delete plan
                        </Button>
                        <hr />
                    </div>
                ))}
                <Button onClick={saveData}>Save Changes</Button>
            </Row>
        </Container>
    );
}
