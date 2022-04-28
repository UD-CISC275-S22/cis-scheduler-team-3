import React from "react";
import { Container, Row } from "react-bootstrap";
import type { Course } from "../interfaces/course";
import { CoursePoolTable } from "./CoursePoolTable";

export function CoursePool({
    plan_pool
}: {
    plan_pool: Course[];
}): JSX.Element {
    return (
        <Container
            className="course-pool"
            style={{ overflowY: "scroll", height: "400px" }}
        >
            <Row>
                <h5>Course Pool: </h5>
            </Row>
            <Row lg={6} id="course-row" data-testid="course-pool">
                {plan_pool.map((course: Course) => (
                    <CoursePoolTable
                        key={course.code}
                        course={course}
                    ></CoursePoolTable>
                ))}
            </Row>
        </Container>
    );
}
