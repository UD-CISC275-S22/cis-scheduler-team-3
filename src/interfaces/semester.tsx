import { Course } from "./course";

export type session = "Fall" | "Winter" | "Summer" | "Spring";

export interface Semester {
    courses: Course[];
    year: number;
    session: session;
    credits: number;
}
