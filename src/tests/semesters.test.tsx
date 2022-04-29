import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../App";
import userEvent from "@testing-library/user-event";
describe("Add, Remove, & Clear Semesters", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("can add a semester", () => {
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
    });
    test("can remove a semester", () => {
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
        const delsem = screen.getByTestId("delete-sem-btn");
        delsem.click();
        expect(screen.queryByText(/test semester/i)).not.toBeInTheDocument();
    });
    test("can clear semesters", () => {
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
        const addsem2 = screen.getByTestId("add-sem-btn");
        addsem2.click();
        const txtbox3 = screen.queryAllByRole("textbox");
        userEvent.type(txtbox3[0], "test semester 2");
        const add3 = screen.getByTestId("save-sem");
        add3.click();
        expect(screen.queryByText(/test semester 2/i)).toBeInTheDocument();
        const clear_sem = screen.getByTestId("clear-sem-btn");
        clear_sem.click();
        expect(screen.queryByText(/test semester 2/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/test semester/i)).not.toBeInTheDocument();
    });
});