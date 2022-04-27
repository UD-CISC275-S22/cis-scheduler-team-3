import React from "react";
import { render, screen } from "@testing-library/react";
import { CoursePool } from "../components/CoursePool";
import userEvent from "@testing-library/user-event";
import { SAMPLE_PLANS } from "../interfaces/degreeplan";

describe("Test suite for CoursePool component", () => {
    beforeEach(() => {
        render(<CoursePool plans={SAMPLE_PLANS} />);
    });
    test("Can add a new course", () => {
        const addcourse = screen.getByTestId("add-course-btn");
        addcourse.click();
        const title = screen.getByTestId("course-title-box");
        userEvent.type(title, "test course");
        const code = screen.getByTestId("course-code-box");
        userEvent.type(code, "test101");
        const des = screen.getByTestId("course-des-box");
        userEvent.type(des, "intro to testing");
        const credits = screen.getByTestId("course-credits-box");
        userEvent.selectOptions(credits, "1");
        const add = screen.getByTestId("addcourse-btn");
        add.click();
        expect(screen.queryByText(/test course/i)).toBeInTheDocument();
        expect(screen.queryByText(/test101/i)).toBeInTheDocument();
        expect(screen.queryByText(/intro to testing/i)).toBeInTheDocument();
    });
});
