import React from "react";
import { render } from "@testing-library/react";
import { SemesterView } from "./SemesterView";

const TEST_SEMESTER = {
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
    semester_credits: 6
};

describe("Test suite for SemesterView component", () => {
    beforeEach(() => {
        render(<SemesterView semester={TEST_SEMESTER} />);
    });
});
