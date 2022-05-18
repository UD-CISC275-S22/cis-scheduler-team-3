import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { SearchHeartFill } from "react-bootstrap-icons";
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
    const [search, setSearch] = useState("");

    // const filteredCourses = planpool.filter((course) => {
    //     //if no input the return the original
    //     if (search.length === 0) {
    //         return planpool;
    //     }
    //     //return the item which contains the user input
    //     else {
    //         return course.code
    //             .replace(/ /g, "")
    //             .toLowerCase()
    //             .includes(search.replace(/ /g, ""));
    //     }
    // });
    return (
        <Container
            style={{ overflowY: "scroll", height: "400px" }}
            data-testid="course-pool"
        >
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
