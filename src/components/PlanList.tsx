import React from "react";
import { Container, Row } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { PlanView } from "./PlanView";

export function PlanList({ plans }: { plans: DegreePlan[] }): JSX.Element {
    return (
        <Container data-testid="Plan-list">
            <Row>
                <h6>Plans:</h6>
                {plans.map((plan: DegreePlan) => (
                    <div key={plan.Start_Year}>
                        <PlanView plan={plan}></PlanView>
                    </div>
                ))}
            </Row>
        </Container>
    );
}
