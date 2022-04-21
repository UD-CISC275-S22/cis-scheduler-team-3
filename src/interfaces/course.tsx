// export interface Course {
//     code: string; // The course code
//     title: string; // Official title of the course
//     description: string; // Description of the course
//     course_credits: number; // Number of credits recieved from taking the course
//     prerequisites: string[]; // List of prerequisites that are needed to take the course, empty list if no prerequisites
//     restrict: string; //A string representing the restrictions of what students can enroll in the course
//     breadth: string; //A string representing what breadth categories
//     offered: string; //A string representing what semesters this course is offered
//     requirement: boolean; // Whether this course satisfies a major requirement
// }

export interface Course {
    code: string; // The course code
    title: string; // Official title of the course
    description: string; // Description of the course
    course_credits: string; // Number of credits recieved from taking the course
    prerequisites: string; // List of prerequisites that are needed to take the course, empty list if no prerequisites
    requirement: boolean; // Whether this course satisfies a major requirement
}
