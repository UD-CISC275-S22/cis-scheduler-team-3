import React from "react";
import { render, screen } from "@testing-library/react";
import { SemesterList } from "../components/SemesterList";

const TEST_SEMESTERS = [
    {
        courses: [
            {
                code: "ENG110",
                title: "Seminar in Composition",
                description: "Freshman english class required for all students",
                course_credits: 3,
                prerequisites: [],
                requirement: true
            },
            {
                code: "CISC108",
                title: "Intro to Computer Science I",
                description: "Basic coding principles",
                course_credits: 3,
                prerequisites: [],
                requirement: true
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
                requirement: true
            },
            {
                code: "CISC181",
                title: "Intro to Computer Science II",
                description: "More advanced coding principles",
                course_credits: 3,
                prerequisites: [],
                requirement: true
            }
        ],
        year: 2022,
        session: "Spring",
        semester_credits: 0
    }
];

describe("Test suite for SemesterList component", () => {
    beforeEach(() => {
        render(<SemesterList in_semesters={TEST_SEMESTERS} />);
    });
    test("There is at least one semester rendered.", () => {
        const list = screen.getByTestId("Semester_List");
        expect(list).toBeInTheDocument();
    });
    test("Multiple Semesters can and are rendered.", () => {
        const list = screen.getAllByTestId("Semester");
        expect(list.length).toEqual(TEST_SEMESTERS.length);
    });
});
