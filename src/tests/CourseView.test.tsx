import React from "react";
import { render, screen } from "@testing-library/react";
import { CourseView } from "../components/CourseView";

const TEST_COURSES = [
    {
        code: "ENG110",
        title: "Seminar in Composition",
        description: "Freshman english class required for all students",
        course_credits: "3",
        prerequisites: "",
        requirement: true
    },
    {
        code: "CISC108",
        title: "Intro to Computer Science I",
        description: "Basic coding principles",
        course_credits: "3",
        prerequisites: "",
        requirement: true
    },

    {
        code: "MATH241",
        title: "Calculus 1",
        description: "Math Class required for CISC majors",
        course_credits: "3",
        prerequisites: "",
        requirement: true
    },
    {
        code: "CISC181",
        title: "Intro to Computer Science II",
        description: "More advanced coding principles",
        course_credits: "3",
        prerequisites: "",
        requirement: true
    }
];

describe("Test suite for CourseView component", () => {
    beforeEach(() => {
        render(<CourseView course={TEST_COURSES[0]} />);
    });
    test("The course is rendered", () => {
        const semester = screen.getByTestId("Course");
        expect(semester).toBeInTheDocument();
    });
    test("The course renders the title", () => {
        const title = screen.getByTestId("course-title");
        expect(title).toBeInTheDocument();
    });
    test("The course renders the credits", () => {
        const credits = screen.getByTestId("course-credits");
        expect(credits).toBeInTheDocument();
    });
    test("The course renders the description", () => {
        const des = screen.getByTestId("course-des");
        expect(des).toBeInTheDocument();
    });
    test("The course renders if requirement is fulfilled", () => {
        const credits = screen.getByTestId("course-req");
        expect(credits).toBeInTheDocument();
    });
    test("The course renders the prerequisites", () => {
        const credits = screen.getByTestId("course-prereq");
        expect(credits).toBeInTheDocument();
    });
});
