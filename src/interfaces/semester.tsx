import { Course } from "./course";

// Session type is used to specify which part of the year the semester take place during
export type session = "Fall" | "Winter" | "Summer" | "Spring";

export interface Semester {
    courses: Course[]; // List of Courses in a semester (i.e. CISC108, ENGL110, MATH241)
    year: number; // Year in which the semester takes place (i.e. 2022)
    session: session; // Which part of the year in which semester takes place (i.e. Fall)
    semester_credits: number; // The total number of credits taken during a given semester
}
