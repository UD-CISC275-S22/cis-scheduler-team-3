import React from "react";
import { Container, Row } from "react-bootstrap";
import type { Course } from "../interfaces/course";
import type { Semester } from "../interfaces/semester";
import type { DegreePlan } from "../interfaces/degreeplan";
import { CoursePoolTable } from "./CoursePoolTable";
//function that loops through array of courses in the pool, calling CoursePoolTable on each
export function CoursePool({
    planpool,
    plan,
    semester,
    editPlan
}: {
    planpool: Course[];
    plan: DegreePlan;
    semester: Semester;
    editPlan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    return (
        <Container
            style={{ overflowY: "scroll", height: "400px" }}
            data-testid="course-pool"
        >
            <Row>
                <h5>Course Pool: </h5>
            </Row>
            <Row>
                {planpool.map((course: Course) => (
                    <CoursePoolTable
                        key={course.code}
                        course={course}
                        plan={plan}
                        editPlan={editPlan}
                        semester={semester}
                    ></CoursePoolTable>
                ))}
            </Row>
        </Container>
    );
}
