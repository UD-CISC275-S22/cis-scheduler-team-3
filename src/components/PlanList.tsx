import React from "react";
import { Container, Row } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { PlanView } from "./PlanView";

export function PlanList({ plans }: { plans: DegreePlan[] }): JSX.Element {
    return (
        <Container data-testid="Plan-list">
            <Row>
                <h2>Plans:</h2>
                {plans.map((plan: DegreePlan) => (
                    <div
                        key={plan.Start_Year + plan.End_Year}
                        data-testid="plan"
                    >
                        <PlanView plan={plan}></PlanView>
                        <hr />
                    </div>
                ))}
            </Row>
        </Container>
    );
}
