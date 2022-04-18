import React from "react";
import { DegreePlan } from "../interfaces/degreeplan";
import { SemesterList } from "./SemesterList";

export function PlanView({ plan }: { plan: DegreePlan }): JSX.Element {
    return (
        <div data-testid="degree-plan">
            <h4 data-testid="name">{plan.name}</h4>
            <h6 data-testid="start-year">Start Year: {plan.Start_Year}</h6>
            <h6 data-testid="end-year">End Year: {plan.End_Year}</h6>
            <h6 data-testid="semester-list">
                <SemesterList semesters={plan.semesters}></SemesterList>
            </h6>
            <h6 data-testid="degree-credits">
                Degree Credits: {plan.degree_credits}
            </h6>
        </div>
    );
}
