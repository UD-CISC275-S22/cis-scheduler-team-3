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

export const BASE_SEMESTERS = [
    {
        courses: [
            {
                code: "ENG110",
                title: "Seminar in Composition",
                description: "Freshman english class required for all students",
                course_credits: 3,
                prerequisites: [],
                requirement: "none"
            },
            {
                code: "CISC108",
                title: "Intro to Computer Science I",
                description: "Basic coding principles",
                course_credits: 3,
                prerequisites: [],
                requirement: "none"
            }
        ],
        year: 2021,
        session: "Fall",
        semester_credits: 0
    },
    {
        courses: [
            {
                code: "MATH241",
                title: "Calculus 1",
                description: "Math Class required for CISC majors",
                course_credits: 3,
                prerequisites: [],
                requirement: "none"
            },
            {
                code: "CISC181",
                title: "Intro to Computer Science II",
                description: "More advanced coding principles",
                course_credits: 3,
                prerequisites: [],
                requirement: "none"
            }
        ],
        year: 2022,
        session: "Spring",
        semester_credits: 0
    }
];
