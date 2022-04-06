//continue to add more requirements as we build
export type DegreeRequirement = "English" | "Breadth";
export interface Course {
    code: number;
    title: string;
    description: string;
    credits: number;
    prerequisites: string[];
    requirement: DegreeRequirement;
}
