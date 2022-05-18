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
        const addsem = screen.getByTestId("add-sem-btn");
        addsem.click();
        const txtbox2 = screen.queryAllByRole("textbox");
        userEvent.type(txtbox2[0], "2020");
        const add2 = screen.getByTestId("save-sem");
        add2.click();
        expect(screen.queryByText(/:2020/i)).toBeInTheDocument();
        const showpool = screen.getByTestId("show-pool-button");
        showpool.click();
        const pool = screen.getAllByTestId("course-pool");
        expect(pool[0]).toBeInTheDocument();
    });
});
