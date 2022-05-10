import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { PlanView } from "./PlanView";
/*this function loops through the array of plans and calls PlanView for each plan object*/
export function PlanList({
    plans,
    editPlan,
    deletePlan,
    saveData,
    downloadPlan
}: {
    plans: DegreePlan[];
    editPlan: (name: string, newPlan: DegreePlan) => void;
    deletePlan: (name: string) => void;
    saveData: () => void;
    downloadPlan: (plan: DegreePlan) => void;
}): JSX.Element {
    function removePlan(plan: DegreePlan) {
        deletePlan(plan.name);
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
                        <PlanView
                            plan={plan}
                            editPlan={editPlan}
                            downloadPlan={downloadPlan}
                        ></PlanView>
                        <Button
                            className="me-3"
                            variant="outline-danger"
                            onClick={() => removePlan(plan)}
                            data-testid="delete-plan-btn"
                            size="sm"
                        >
                            🗑 delete plan
                        </Button>
                        <hr />
                    </div>
                ))}
                <Button onClick={saveData}> 💾 Save Changes</Button>
            </Row>
        </Container>
    );
}
