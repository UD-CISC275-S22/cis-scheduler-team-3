import { Course } from "./course";

// Session type is used to specify which part of the year the semester take place during
/*  Disabled for time being needs long term fixing
export type session = "Fall" | "Winter" | "Summer" | "Spring";
*/

export interface Semester {
    courses: Course[]; // List of Courses in a semester (i.e. CISC108, ENGL110, MATH241)
    year: number; // Year in which the semester takes place (i.e. 2022)
    session: string; // Which part of the year in which semester takes place (i.e. Fall)
    semester_credits: number; // The total number of credits taken during a given semester
}

export const SEMESTERS = [
    {
        courses: [],
        year: 2021,
        session: "Fall",
        semester_credits: 0
    },
    {
        courses: [],
        year: 2022,
        session: "Spring",
        semester_credits: 0
    }
];
