import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { PlanView } from "./PlanView";

export function PlanList({
    plans,
    setplans
}: {
    plans: DegreePlan[];
    setplans: (newPlans: DegreePlan[]) => void;
}): JSX.Element {
    function deletePlan(plan: DegreePlan) {
        const newplans = [...plans].filter(
            (dp: DegreePlan): boolean => dp.name != plan.name
        );
        setplans(newplans);
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
                        <PlanView plan={plan} setplans={setplans}></PlanView>
                        <Button
                            className="me-3"
                            variant="outline-danger"
                            onClick={() => deletePlan(plan)}
                            data-testid="delete-plan-btn"
                        >
                            delete plan
                        </Button>
                        <hr />
                    </div>
                ))}
            </Row>
        </Container>
    );
}
