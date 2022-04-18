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

    //function here needs to be completed to get moveable semesters working
    function completeMove(
        moving: Course,
        origin: Semester,
        destination: Semester
    ) {
        const moving_index = origin.courses.findIndex(
            (course: Course): boolean => course.code === moving.code
        );
        /*
        const origin_index = semesters.findIndex(
            (semester: Semester): boolean =>
                semester.session + semester.year ===
                origin.session + origin.year
        );
        const destination_index = semesters.findIndex(
            (semester: Semester): boolean =>
                semester.session + semester.year ===
                destination.session + destination.year
        );
        */
        origin = {
            ...origin,
            courses: [...origin.courses.splice(moving_index, 1)]
        };
        const len = destination.courses.length;
        destination = {
            ...destination,
            courses: [...destination.courses.splice(len, 0, moving)]
        };
        console.log(semesters);
        setSemesters([...semesters]);
        /*
        if (origin_index < destination_index) {
            setSemesters([
                ...semesters.slice(0, origin_index),
                origin,
                ...semesters.slice(origin_index + 1, destination_index),
                destination,
                ...semesters.slice(destination_index + 1)
            ]);
            console.log(semesters);
        } else if (destination_index < origin_index) {
            setSemesters([
                ...semesters.slice(0, destination_index),
                destination,
                ...semesters.slice(destination_index + 1, origin_index),
                origin,
                ...semesters.slice(origin_index + 1)
            ]);
            console.log(semesters);
        }
        */
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
