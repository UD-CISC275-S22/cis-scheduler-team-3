import { Course } from "./course";

export interface Semester {
    courses: Course[]; // List of Courses in a semester (i.e. CISC108, ENGL110, MATH241)
    year: number; // Year in which the semester takes place (i.e. 2022)
    session: string; // Which part of the year in which semester takes place (i.e. Fall)
    semestercredits: number; // The total number of credits taken during a given semester
}
