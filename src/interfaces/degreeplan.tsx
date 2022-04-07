import { Semester } from "./semester";

export interface DegreePlan {
    Start_Year: number;
    End_Year: number;
    semesters: Semester[];
}
