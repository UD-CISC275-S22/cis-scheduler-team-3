import React from "react";
import { render } from "@testing-library/react";
import { SemesterList } from "./SemesterList";

const TEST_SEMESTERS = [
    {
        courses: [
            {
                code: "ENG110",
                title: "Seminar in Composition",
                description: "Freshman english class required for all students",
                course_credits: 3,
                prerequisites: [],
                requirement: "none"
            },
            {
                code: "CISC108",
                title: "Intro to Computer Science I",
                description: "Basic coding principles",
                course_credits: 3,
                prerequisites: [],
                requirement: "none"
            }
        ],
        year: 2021,
        session: "Fall",
        semester_credits: 0
    },
    {
        courses: [
            {
                code: "MATH241",
                title: "Calculus 1",
                description: "Math Class required for CISC majors",
                course_credits: 3,
                prerequisites: [],
                requirement: "none"
            },
            {
                code: "CISC181",
                title: "Intro to Computer Science II",
                description: "More advanced coding principles",
                course_credits: 3,
                prerequisites: [],
                requirement: "none"
            }
        ],
        year: 2022,
        session: "Spring",
        semester_credits: 0
    }
];

describe("Test suite for SemesterView component", () => {
    beforeEach(() => {
        render(<SemesterList semesters={TEST_SEMESTERS} />);
    });
});
