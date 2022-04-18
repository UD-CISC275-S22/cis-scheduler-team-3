import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { CourseList } from "./CourseList";
import { SemesterList } from "./SemesterList";

export function PlanView({ plan }: { plan: DegreePlan }): JSX.Element {
    return (
        <div data-testid="degree-plan">
            <ul>
                <li data-testid="start-year">Start Year: {plan.Start_Year}</li>
                <li data-testid="end-year">End Year: {plan.End_Year}</li>
                <li data-testid="semester-list">
                    <SemesterList semesters={plan.semesters}></SemesterList>
                </li>
                <li data-testid="degree-credits">
                    Degree Credits: {plan.degree_credits}
                </li>
            </ul>
        </div>
    );
}
