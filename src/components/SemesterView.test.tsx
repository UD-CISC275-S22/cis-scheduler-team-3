import React from "react";
import { render, screen } from "@testing-library/react";
import { SemesterView } from "./SemesterView";

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

describe("Test suite for SemesterView component", () => {
    beforeEach(() => {
        render(<SemesterView semester={TEST_SEMESTERS[0]} />);
    });
    test("The semester is rendered", () => {
        const semester = screen.getByTestId("Semester");
        expect(semester).toBeInTheDocument();
    });
    test("The semester renders the title", () => {
        const title = screen.getByTestId("Semester_Title");
        expect(title).toBeInTheDocument();
    });
    test("The semester renders the credits", () => {
        const credits = screen.getByTestId("Semester_Credits");
        expect(credits).toBeInTheDocument();
    });
    test("The semester renders the courses", () => {
        const list = screen.getByTestId("Course_List");
        expect(list).toBeInTheDocument();
    });
});
