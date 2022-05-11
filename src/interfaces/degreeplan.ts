import { Course } from "./course";
import { Semester } from "./semester";

export interface DegreePlan {
    name: string; //name of the plan according to user
    startyear: number; // The start year of the plan
    endyear: number; // The end year of the plan
    semesters: Semester[]; // List of semesters that are included in a plan
    degreecredits: number; // Total credit alloted to the degree plan
    planpool: Course[];
}
