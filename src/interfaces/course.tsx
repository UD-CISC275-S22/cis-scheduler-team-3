export interface Course {
    code: string; // The course code
    title: string; // Official title of the course
    description: string; // Description of the course
    course_credits: number; // Number of credits recieved from taking the course
    prerequisites: string[]; // List of prerequisites that are needed to take the course, empty list if no prerequisites
    requirement: string; // Whether this course satisfies a major requirement
}
