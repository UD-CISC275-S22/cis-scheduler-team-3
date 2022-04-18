import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanList } from "../components/PlanList";
import { SAMPLE_PLANS } from "../interfaces/degreeplan";

describe("Test suite for PlanList component", () => {
    beforeEach(() => {
        render(<PlanList plans={SAMPLE_PLANS} />);
    });
    test("There is at least one plan", () => {
        const list = screen.getByTestId("Plan-list");
        expect(list).toBeInTheDocument();
    });
    test("Multiple plans can and are rendered.", () => {
        const list = screen.getAllByTestId("plan");
        expect(list.length).toEqual(SAMPLE_PLANS.length);
    });
});
