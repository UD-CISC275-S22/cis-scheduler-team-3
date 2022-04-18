import { Semester } from "./semester";
import { BASE_SEMESTERS } from "./semester";
export interface DegreePlan {
    name: string; //name of the plan according to user
    Start_Year: number; // The start year of the plan
    End_Year: number; // The end year of the plan
    semesters: Semester[]; // List of semesters that are included in a plan
    degree_credits: number; // Total credit alloted to the degree plan
}
export const SAMPLE_PLANS = [
    {
        name: "Sample Plan 1",
        Start_Year: 2022,
        End_Year: 2023,
        semesters: BASE_SEMESTERS,
        degree_credits: 0
    },
    {
        name: "Sample Plan 2",
        Start_Year: 2023,
        End_Year: 2024,
        semesters: [],
        degree_credits: 0
    }
];
