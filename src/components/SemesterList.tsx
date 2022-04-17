import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { SemesterView } from "./SemesterView";
import { CourseMover } from "./CourseMover";

export function SemesterList({
    semesters
}: {
    semesters: Semester[];
}): JSX.Element {
    const [moveCourse, setMoveCourse] = useState<boolean>(false);
    return (
        <Container className="course-pool" data-testid="Semester_List">
            <Row>
                <h2>Semester View:</h2>
                <Button onClick={() => setMoveCourse(!moveCourse)}>
                    Course Mover
                </Button>
                {moveCourse ? (
                    <CourseMover semesters={semesters}></CourseMover>
                ) : null}
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
