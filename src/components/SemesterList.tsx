import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { SemesterView } from "./SemesterView";

export function SemesterList({
    semesters,
    removesem
}: {
    semesters: Semester[];
    removesem: (n: string) => void;
}): JSX.Element {
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
                        <SemesterView semester={semester}></SemesterView>
                        <Button
                            className="me-3"
                            size="sm"
                            variant="outline-danger"
                            onClick={() => deleteSemester(semester)}
                        >
                            delete semester
                        </Button>
                    </div>
                ))}
            </Row>
        </Container>
    );
}
