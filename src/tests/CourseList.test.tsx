import React from "react";
import { render, screen } from "@testing-library/react";
import { CourseList } from "../components/CourseList";

const TEST_COURSES = [
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
    },

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
];

describe("Test suite for CourseList component", () => {
    beforeEach(() => {
        render(<CourseList courses={TEST_COURSES} />);
    });
    test("There is at least one course rendered.", () => {
        const list = screen.getByTestId("Course_List");
        expect(list).toBeInTheDocument();
    });
    test("Multiple courses can and are rendered.", () => {
        const list = screen.getAllByTestId("Course");
        expect(list.length).toEqual(TEST_COURSES.length);
    });
});
