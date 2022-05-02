import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../App";
import userEvent from "@testing-library/user-event";
describe("Edit Courses and Credit totals", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("Course credits update automatically", () => {
        const addplan = screen.getByTestId("add-plan-btn");
        addplan.click();
        const txtbox = screen.queryAllByRole("textbox");
        userEvent.type(txtbox[0], "test plan");
        const add = screen.getByTestId("add-btn");
        add.click();
        expect(screen.queryByText(/test plan/i)).toBeInTheDocument();
        const addsem = screen.getByTestId("add-sem-btn");
        addsem.click();
        const txtbox2 = screen.queryAllByRole("textbox");
        userEvent.type(txtbox2[0], "test semester");
        const add2 = screen.getByTestId("save-sem");
        add2.click();
        expect(screen.queryByText(/test semester/i)).toBeInTheDocument();
        const add_course = screen.getByTestId("add-course-btn");
        add_course.click();
        expect(
            screen.queryByText(/Title: Edit course info/i)
        ).toBeInTheDocument();
        const editmode = screen.getByTestId("course_editmode");
        editmode.click();
    });
});
