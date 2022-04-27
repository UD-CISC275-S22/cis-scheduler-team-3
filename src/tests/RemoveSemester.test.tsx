import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../App";
//import userEvent from "@testing-library/user-event";

describe("Remove Semester and Clear SemesterTests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("can delete semesters", () => {
        const deleteplan = screen.getAllByTestId("delete-sem-btn");
        deleteplan[0].click();
        expect(screen.queryByText(/Fall:2021/i)).not.toBeInTheDocument();
    });
    test("can clear semesters", () => {
        const clearplan = screen.getAllByTestId("clear-sem-btn");
        clearplan[0].click();
        expect(screen.queryByText(/Fall:2021/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Spring:2021/i)).not.toBeInTheDocument();
    });
});
