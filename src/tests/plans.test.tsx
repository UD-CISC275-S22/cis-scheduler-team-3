import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../App";
import userEvent from "@testing-library/user-event";
describe("Add & Remove Plan Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("can add a plan", () => {
        const addplan = screen.getByTestId("add-plan-btn");
        addplan.click();
        const txtbox = screen.queryAllByRole("textbox");
        userEvent.type(txtbox[0], "test plan");
        const add = screen.getByTestId("add-btn");
        add.click();
        expect(screen.queryByText(/test plan/i)).toBeInTheDocument();
        const plan = screen.getByTestId("degree-plan");
        expect(plan).toBeInTheDocument();
    });
    test("can remove a plan", () => {
        const addplan = screen.getByTestId("add-plan-btn");
        addplan.click();
        const txtbox = screen.queryAllByRole("textbox");
        userEvent.type(txtbox[0], "test plan");
        const add = screen.getByTestId("add-btn");
        add.click();
        const delplan = screen.getByTestId("delete-plan-btn");
        delplan.click();
        expect(screen.queryByText(/test plan/i)).not.toBeInTheDocument();
    });
    test("can view course pool", () => {
        const addplan = screen.getByTestId("add-plan-btn");
        addplan.click();
        const txtbox = screen.queryAllByRole("textbox");
        userEvent.type(txtbox[0], "test plan");
        const add = screen.getByTestId("add-btn");
        add.click();
        expect(screen.queryByText(/test plan/i)).toBeInTheDocument();
        const showpool = screen.getByTestId("show-pool-btn");
        showpool.click();
        const pool = screen.getAllByTestId("course-pool");
        expect(pool[0]).toBeInTheDocument();
    });
});
