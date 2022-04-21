import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { PlanView } from "./PlanView";

export function PlanList({
    plans,
    remove
}: {
    plans: DegreePlan[];
    remove: (n: string) => void;
}): JSX.Element {
    function deletePlan(name: string) {
        remove(name);
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
                        <PlanView plan={plan}></PlanView>
                        <Button
                            className="me-3"
                            variant="danger"
                            onClick={() => deletePlan(plan.name)}
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
