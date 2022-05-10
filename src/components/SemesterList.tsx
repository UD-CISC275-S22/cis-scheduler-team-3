import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreeplan";
import { SemesterView } from "./SemesterView";
/* loops through array of semesters, calling SemesterView for each, also contains function to delete semester */
export function SemesterList({
    plan,
    editPlan
}: {
    plan: DegreePlan;
    editPlan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    function deleteSemester(id: string, credits: number) {
        const newsemesters = plan.semesters.filter(
            (semester: Semester): boolean =>
                semester.session + ":" + semester.year != id
        );
        const new_PlanCredits = plan.degree_credits - credits;
        const newPlan = {
            ...plan,
            semesters: newsemesters,
            degree_credits: new_PlanCredits
        };
        editPlan(plan.name, newPlan);
    }
    return (
        <Container className="Semester" data-testid="Semester_List">
            <Row>
                <h4>Semesters:</h4>
                {plan.semesters.map((semester: Semester) => (
                    <div
                        key={semester.session + semester.year}
                        className="bg-light border m-2 p-2"
                    >
                        <SemesterView
                            plan={plan}
                            editPlan={editPlan}
                            semester={semester}
                        ></SemesterView>
                        <p></p>
                        <Button
                            className="me-3"
                            size="sm"
                            variant="outline-danger"
                            onClick={() =>
                                deleteSemester(
                                    semester.session + ":" + semester.year,
                                    semester.semester_credits
                                )
                            }
                            data-testid="delete-sem-btn"
                        >
                            🗑 delete semester
                        </Button>
                    </div>
                ))}
            </Row>
        </Container>
    );
}
