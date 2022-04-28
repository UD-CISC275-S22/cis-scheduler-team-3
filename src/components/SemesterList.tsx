import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { DegreePlan } from "../interfaces/degreeplan";
import { SemesterView } from "./SemesterView";

export function SemesterList({
    plan,
    editplan
}: {
    plan: DegreePlan;
    editplan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    function deleteSemester(id: string) {
        const newsemesters = plan.semesters.filter(
            (semester: Semester): boolean =>
                semester.session + ":" + semester.year != id
        );
        const newPlan = {
            ...plan,
            semesters: newsemesters
        };
        editplan(plan.name, newPlan);
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
                            editplan={editplan}
                            semester={semester}
                        ></SemesterView>
                        <Button
                            className="me-3"
                            size="sm"
                            variant="outline-danger"
                            onClick={() =>
                                deleteSemester(
                                    semester.session + ":" + semester.year
                                )
                            }
                            data-testid="delete-sem-btn"
                        >
                            delete semester
                        </Button>
                    </div>
                ))}
            </Row>
        </Container>
    );
}
