import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Semester } from "../interfaces/semester";
import { SemesterView } from "./SemesterView";
import { CourseMover } from "./CourseMover";
import { Course } from "../interfaces/course";

export function SemesterList({
    in_semesters
}: {
    in_semesters: Semester[];
}): JSX.Element {
    const [moveCourse, setMoveCourse] = useState<boolean>(false);
    const [semesters, setSemesters] = useState<Semester[]>(in_semesters);

    function completeMove(
        moving: Course,
        origin: Semester,
        destination: Semester
    ) {
        const moving_index = origin.courses.findIndex(
            (course: Course): boolean => course.code === moving.code
        );
        origin = {
            ...origin,
            courses: [...origin.courses.splice(moving_index, 1)]
        };
        const len = destination.courses.length;
        destination = {
            ...destination,
            courses: [...destination.courses.splice(len, 0, moving)]
        };
        setSemesters([...semesters]);
    }

    return (
        <Container className="course-pool" data-testid="Semester_List">
            <Row>
                <h2>Semester View:</h2>
                <Button onClick={() => setMoveCourse(!moveCourse)}>
                    Course Mover
                </Button>
                {moveCourse ? (
                    <CourseMover
                        semesters={semesters}
                        completeMove={completeMove}
                    ></CourseMover>
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
