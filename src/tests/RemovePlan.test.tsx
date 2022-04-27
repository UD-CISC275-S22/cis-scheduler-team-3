import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../App";
//import userEvent from "@testing-library/user-event";

describe("Remove Plan Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("can delete plans", () => {
        const deleteplan = screen.getAllByTestId("delete-plan-btn");
        deleteplan[0].click();
        expect(screen.queryByText(/Sample Plan 1/i)).not.toBeInTheDocument();
    });
});
