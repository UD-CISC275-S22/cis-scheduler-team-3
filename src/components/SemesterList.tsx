import React from "react";
import { Container, Row } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { SemesterView } from "./SemesterView";

export function SemesterList({
    semesters
}: {
    semesters: Semester[];
}): JSX.Element {
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
                    </div>
                ))}
            </Row>
        </Container>
    );
}
