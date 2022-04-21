import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../App";
import userEvent from "@testing-library/user-event";
describe("Add Semester Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("can add a semester", () => {
        const addsem = screen.getAllByTestId("add-semester-btn");
        addsem[0].click();
        const txtbox = screen.queryAllByRole("textbox");
        userEvent.type(txtbox[0], "Fall");
        const add = screen.getByTestId("add-btn2");
        add.click();
        expect(screen.queryByText(/Fall:0/i)).toBeInTheDocument();
    });
});
