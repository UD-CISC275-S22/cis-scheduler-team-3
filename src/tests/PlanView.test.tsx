import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanView } from "../components/PlanView";
import { SAMPLE_PLANS } from "../interfaces/degreeplan";

describe("Test suite for PlanView component", () => {
    beforeEach(() => {
        render(<PlanView plan={SAMPLE_PLANS[0]} />);
    });
    test("The plan is rendered", () => {
        const plan = screen.getByTestId("degree-plan");
        expect(plan).toBeInTheDocument();
    });
    test("The plan renders the name", () => {
        const name = screen.getByTestId("name");
        expect(name).toBeInTheDocument();
    });
    test("The plan renders the start year", () => {
        const start_year = screen.getByTestId("start-year");
        expect(start_year).toBeInTheDocument();
    });
    test("The plan renders the end year", () => {
        const end_year = screen.getByTestId("end-year");
        expect(end_year).toBeInTheDocument();
    });
    test("The plan renders the semester list", () => {
        const semester_list = screen.getByTestId("semester-list");
        expect(semester_list).toBeInTheDocument();
    });
});
