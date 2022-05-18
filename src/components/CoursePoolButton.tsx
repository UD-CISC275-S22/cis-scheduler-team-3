import React, { useState } from "react";
import { Button } from "react-bootstrap";
import type { DegreePlan } from "../interfaces/degreeplan";
import type { Semester } from "../interfaces/semester";
import { CoursePool } from "./CoursePool";

export function CoursePoolButton({
    plan,
    semester,
    editPlan
}: {
    plan: DegreePlan;
    semester: Semester;
    editPlan: (id: string, newPlan: DegreePlan) => void;
}): JSX.Element {
    const [showPool, setShowPool] = useState<boolean>(false);

    function showCoursePool() {
        setShowPool(!showPool);
    }
    return (
        <div className="show-course-pool-button">
            <Button
                data-testid="show-pool-btn"
                size="sm"
                onClick={showCoursePool}
            >
                {showPool
                    ? "Hide pool of CISC-related courses"
                    : "Show pool of CISC-related courses"}
            </Button>
            {showPool ? (
                <CoursePool
                    planpool={plan.planpool}
                    plan={plan}
                    editPlan={editPlan}
                    semester={semester}
                ></CoursePool>
            ) : null}
        </div>
    );
}
