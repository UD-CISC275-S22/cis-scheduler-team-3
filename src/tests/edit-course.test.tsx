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
        userEvent.type(txtbox2[0], "2020");
        const add2 = screen.getByTestId("save-sem");
        add2.click();
        expect(screen.queryByText(/:2020/i)).toBeInTheDocument();
        const add_course = screen.getByTestId("add-course-btn");
        add_course.click();
        const txtboxes = screen.queryAllByRole("textbox");
        userEvent.type(txtboxes[0], "new course");
        userEvent.type(txtboxes[1], "CISC:100");
        const add3 = screen.getByTestId("addcourse-btn");
        add3.click();
        expect(
            screen.queryByText(/CISC:100 : new course/i)
        ).toBeInTheDocument();
        const editmode = screen.getByTestId("editcourse-switch");
        editmode.click();
        userEvent.selectOptions(screen.getByTestId("course-credits-box"), "3");
        const addcourse = screen.getByTestId("savecourse-btn");
        addcourse.click();
        expect(screen.queryByText(/Degree Credits: 3/i)).toBeInTheDocument();
        expect(screen.queryByText(/Total Credits: 3/i)).toBeInTheDocument();
    });
    test("Edit fields of course", () => {
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
        userEvent.type(txtbox2[0], "2020");
        const add2 = screen.getByTestId("save-sem");
        add2.click();
        expect(screen.queryByText(/:2020/i)).toBeInTheDocument();
        const add_course = screen.getByTestId("add-course-btn");
        add_course.click();
        const txtboxes = screen.queryAllByRole("textbox");
        userEvent.type(txtboxes[0], "new course");
        userEvent.type(txtboxes[1], "CISC:100");
        const add3 = screen.getByTestId("addcourse-btn");
        add3.click();
        expect(
            screen.queryByText(/CISC:100 : new course/i)
        ).toBeInTheDocument();
        const editmode = screen.getByTestId("editcourse-switch");
        editmode.click();
        const titlebox = screen.getByTestId("course-title-box");
        userEvent.type(titlebox, " intro");
        const savecourse = screen.getByTestId("savecourse-btn");
        savecourse.click();
        expect(
            screen.queryByText(/CISC:100 : new course intro/i)
        ).toBeInTheDocument();
    });
});
