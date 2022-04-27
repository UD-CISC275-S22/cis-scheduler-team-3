import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { SemesterView } from "./SemesterView";

export function SemesterList({
    semesters,
    removesem,
    updateplan_credits
}: {
    semesters: Semester[];
    removesem: (n: string) => void;
    updateplan_credits: (credit: number) => void;
}): JSX.Element {
    //sends the id value of the semester to be deleted to a fn in PlanView that performs deletion
    function deleteSemester(semester: Semester) {
        const ty = semester.session + ":" + semester.year;
        removesem(ty);
    }
    return (
        <Container className="Semester" data-testid="Semester_List">
            <Row>
                <h4>Semesters:</h4>
                {semesters.map((semester: Semester) => (
                    <div
                        key={semester.session + semester.year}
                        className="bg-light border m-2 p-2"
                    >
                        <SemesterView
                            semester={semester}
                            updateplan_credits={updateplan_credits}
                        ></SemesterView>
                        <Button
                            className="me-3"
                            size="sm"
                            variant="outline-danger"
                            onClick={() => deleteSemester(semester)}
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
