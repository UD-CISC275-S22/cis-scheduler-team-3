import { Course } from "./course";
import { Semester } from "./semester";

export interface DegreePlan {
    name: string; //name of the plan according to user
    Start_Year: number; // The start year of the plan
    End_Year: number; // The end year of the plan
    semesters: Semester[]; // List of semesters that are included in a plan
    degree_credits: number; // Total credit alloted to the degree plan
    plan_pool: Course[];
}
