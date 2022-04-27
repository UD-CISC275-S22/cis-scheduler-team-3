import React from "react";
import { render, screen } from "@testing-library/react";
import { CoursePool } from "../components/CoursePool";
import { SAMPLE_PLANS } from "../interfaces/degreeplan";
import { Course } from "../interfaces/course";
import POOL_DATA from "../data/course_catalog.json";
const POOLCOURSES = POOL_DATA as Course[];

describe("Test suite for CoursePool component", () => {
    beforeEach(() => {
        render(<CoursePool plans={SAMPLE_PLANS} />);
    });
    test("The course pool renders courses", () => {
        const pool = screen.getByTestId("course-pool");
        expect(pool).toBeInTheDocument();
    });
    test("Add course to pool btn exists", () => {
        const addcourse = screen.getByTestId("add-course-btn");
        expect(addcourse).toBeInTheDocument();
    });
});
